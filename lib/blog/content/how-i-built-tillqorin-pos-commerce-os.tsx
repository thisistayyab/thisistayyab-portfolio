import Link from "next/link"

export function HowIBuiltTillqorinPosCommerceOsBody() {
  return (
    <>
      <p>
        Retail software has zero patience for clever UI that slows down a cashier. When three
        customers are standing at a counter, scanning four items, applying a discount, splitting
        tender between cash and card, and printing an 80mm thermal receipt has to take under ten
        seconds — every single time, without a double-charged invoice or an out-of-sync stock count.
      </p>
      <p>
        <strong>Tillqorin POS</strong> (live at{" "}
        <a href="https://pos.taylancetech.com" target="_blank" rel="noopener noreferrer">
          pos.taylancetech.com
        </a>{" "}
        and detailed in the <Link href="/projects/tillqorin">Tillqorin POS case study</Link>) is a
        web-based point-of-sale and retail commerce OS I built with <strong>React</strong>,{" "}
        <strong>Vite</strong>, <strong>Tailwind CSS</strong>, a <strong>Node.js + Express</strong>{" "}
        REST API, and <strong>Supabase (PostgreSQL)</strong>. This article breaks down the
        architectural decisions behind the system: why we chose a Vite SPA over Next.js for the
        register, how we keep inventory and invoices transactionally consistent, how browser-based
        thermal receipt printing actually works, and the mistakes I would avoid next time.
      </p>

      <h2 id="why-react-vite-express-and-supabase">
        Why React + Vite + Express + Supabase (and Not Next.js)
      </h2>
      <p>
        I build public-facing web applications and marketing platforms in Next.js App Router all the
        time, including this portfolio. For Tillqorin POS, however,{" "}
        <strong>React + Vite</strong> paired with a dedicated <strong>Express API</strong> and{" "}
        <strong>Supabase PostgreSQL</strong> was the right tool for three reasons:
      </p>
      <ol>
        <li>
          <strong>Zero public SEO requirement inside the register:</strong> Every POS screen lives
          behind authentication. A cashier opens the register tab at 8:00 AM and keeps that single
          session open until 10:00 PM. Server-side rendering per navigation adds zero value when
          the app is a long-lived, stateful desktop/tablet workspace.
        </li>
        <li>
          <strong>Instant client-side keyboard and barcode responsiveness:</strong> USB and
          Bluetooth barcode scanners act like rapid-fire keyboards — they type an 8-to-13-digit
          EAN/UPC code followed by <code>Enter</code> in under 40 milliseconds. Keeping the product
          catalog index warm in client memory inside a Vite SPA means adding a scanned SKU to the
          cart happens in a single synchronous render frame without waiting on a server round-trip.
        </li>
        <li>
          <strong>Explicit API boundary for financial mutations:</strong> While Supabase&apos;s
          client SDK is great for reads and real-time subscriptions, routing checkout mutations,
          invoice numbering, refunds, and stock adjustments through our own{" "}
          <strong>Node.js + Express</strong> layer gave us strict request validation, clean audit
          logging, and a single place to enforce multi-step database transactions.
        </li>
      </ol>

      <h2 id="database-schema-and-atomic-checkouts">
        Database Schema: Never Decrement Stock Outside a Transaction
      </h2>
      <p>
        The classic junior mistake in an e-commerce or POS build is handling a sale as three
        separate application-level queries from the frontend or controller:
      </p>
      <ol>
        <li>
          Insert a row into <code>invoices</code>.
        </li>
        <li>
          Loop over cart items and insert rows into <code>invoice_items</code>.
        </li>
        <li>
          Loop over cart items and run <code>UPDATE products SET stock = stock - qty</code>.
        </li>
      </ol>
      <p>
        In production, network hiccups and concurrent registers will eventually fail between step 2
        and step 3 — leaving you with a paid invoice whose stock was never deducted, or two
        cashiers selling the last unit of a SKU at the exact same second.
      </p>
      <p>
        In Tillqorin, the entire checkout executes inside a single{" "}
        <strong>PostgreSQL transactional RPC function</strong> called by the Express API:
      </p>
      <pre>
        <code>{`CREATE OR REPLACE FUNCTION complete_pos_sale(
  p_store_id UUID,
  p_cashier_id UUID,
  p_customer_id UUID,
  p_payment_method TEXT,
  p_discount_cents INTEGER,
  p_items JSONB
) RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_invoice_id UUID;
  v_item JSONB;
  v_product_id UUID;
  v_qty INTEGER;
  v_unit_price INTEGER;
  v_current_stock INTEGER;
  v_subtotal INTEGER := 0;
BEGIN
  -- 1. Lock product rows in deterministic order to prevent deadlocks
  FOR v_item IN
    SELECT * FROM jsonb_array_elements(p_items)
    ORDER BY (value->>'product_id')::UUID
  LOOP
    v_product_id := (v_item->>'product_id')::UUID;
    v_qty := (v_item->>'quantity')::INTEGER;

    SELECT stock_quantity, price_cents
      INTO v_current_stock, v_unit_price
      FROM products
     WHERE id = v_product_id AND store_id = p_store_id
       FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product % not found', v_product_id;
    END IF;

    IF v_current_stock < v_qty THEN
      RAISE EXCEPTION 'Insufficient stock for product % (available: %, requested: %)',
        v_product_id, v_current_stock, v_qty;
    END IF;

    v_subtotal := v_subtotal + (v_unit_price * v_qty);
  END LOOP;

  -- 2. Create invoice header
  INSERT INTO invoices (
    store_id, cashier_id, customer_id,
    subtotal_cents, discount_cents, total_cents, payment_method, status
  ) VALUES (
    p_store_id, p_cashier_id, p_customer_id,
    v_subtotal, p_discount_cents, GREATEST(v_subtotal - p_discount_cents, 0),
    p_payment_method, 'PAID'
  ) RETURNING id INTO v_invoice_id;

  -- 3. Insert line items, decrement stock, and write ledger entries
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_product_id := (v_item->>'product_id')::UUID;
    v_qty := (v_item->>'quantity')::INTEGER;

    SELECT price_cents INTO v_unit_price
      FROM products WHERE id = v_product_id;

    INSERT INTO invoice_items (invoice_id, product_id, quantity, unit_price_cents)
    VALUES (v_invoice_id, v_product_id, v_qty, v_unit_price);

    UPDATE products
       SET stock_quantity = stock_quantity - v_qty,
           updated_at = NOW()
     WHERE id = v_product_id;

    INSERT INTO stock_movements (store_id, product_id, invoice_id, delta, reason)
    VALUES (p_store_id, v_product_id, v_invoice_id, -v_qty, 'SALE');
  END LOOP;

  RETURN v_invoice_id;
END;
$$;`}</code>
      </pre>
      <p>Notice three details in that function that saved us countless headaches:</p>
      <ul>
        <li>
          <strong>
            Deterministic <code>ORDER BY</code> before <code>FOR UPDATE</code>:
          </strong>{" "}
          If Register A scans Item 1 then Item 2, and Register B scans Item 2 then Item 1 at the
          same millisecond, locking rows in cart order can cause a classic Postgres deadlock.
          Sorting the JSON array by <code>product_id</code> before acquiring row locks guarantees
          both transactions lock rows in the exact same order.
        </li>
        <li>
          <strong>Integer cents, never floating-point dollars:</strong> All prices, discounts, tax
          amounts, and totals are stored as integer cents (or smallest currency unit) so{" "}
          <code>0.1 + 0.2</code> never turns into <code>0.30000000000000004</code> on a customer&apos;s
          receipt.
        </li>
        <li>
          <strong>
            An append-only <code>stock_movements</code> ledger:
          </strong>{" "}
          Whenever a store manager asks &quot;why does the system say we have 4 units of SKU-109 when
          there are 6 on the shelf?&quot;, having an immutable ledger of every sale, restock, return,
          and manual adjustment makes reconciliation trivial.
        </li>
      </ul>

      <p>
        Compute-in-SQL shows up in the analytics screen too. Instead of pulling 10,000 invoice rows
        into Node or the browser and reducing them in JavaScript, daily revenue, top-selling SKUs,
        category breakdowns, and low-stock alerts are pre-aggregated in PostgreSQL views and indexed
        date-range queries that return in under 15ms.
      </p>

      <h2 id="designing-for-cashier-speed">
        Designing the Register UI for Barcode Scanners and Keyboard Speed
      </h2>
      <p>
        A point-of-sale interface has completely different ergonomics from a consumer checkout page:
      </p>
      <ul>
        <li>
          <strong>Global barcode listener without focus fights:</strong> Hardware barcode scanners
          emit keystrokes into whatever DOM element currently has focus. If the cashier just clicked
          a quantity button, a naive implementation drops the scanned digits unless the search input
          is focused. We built a global keystroke buffer hook that distinguishes rapid scanner bursts
          (&lt;25ms between characters ending in <code>Enter</code>) from normal human typing inside
          text inputs, routing barcode scans straight into the cart reducer regardless of where focus
          sits.
        </li>
        <li>
          <strong>Idempotent checkout submission:</strong> Cashiers double-tap buttons. Every
          checkout request generates a client-side <code>idempotency_key</code> UUID when the cart
          is finalized; if the cashier taps &quot;Complete Sale&quot; twice on a slow Wi-Fi
          connection, the API returns the existing invoice instead of charging and deducting stock
          twice.
        </li>
        <li>
          <strong>Optimistic cart math with instant keyboard shortcuts:</strong> Incrementing
          quantities, applying line-item or cart-level discounts, and switching payment tender update
          totals synchronously on the client, while the final server commit re-verifies unit prices
          and stock in Postgres.
        </li>
      </ul>

      <h2 id="thermal-receipt-printing">
        How 80mm and 58mm Thermal Receipt Printing Works from a Browser
      </h2>
      <p>
        Retailers use thermal receipt printers (Epson TM-T20, Star TSP100, Xprinter) connected via
        USB, Ethernet, or Bluetooth. For a web POS that needs to run on any Windows PC, Mac, or
        Android tablet without forcing the shop owner to install native driver bridges,{" "}
        <strong>dedicated print CSS targeting 80mm / 58mm roll widths</strong> is the most reliable
        universal baseline:
      </p>
      <pre>
        <code>{`@media print {
  @page {
    size: 80mm auto;
    margin: 0;
  }

  body * {
    visibility: hidden;
  }

  #thermal-receipt,
  #thermal-receipt * {
    visibility: visible;
  }

  #thermal-receipt {
    position: absolute;
    left: 0;
    top: 0;
    width: 72mm;
    padding: 4mm;
    font-family: "Courier New", Courier, monospace;
    font-size: 12px;
    line-height: 1.35;
    color: #000 !important;
    background: #fff !important;
  }
}`}</code>
      </pre>
      <p>
        Thermal printers are monochrome heat heads: anti-aliased gray text looks washed out and
        dithered gradients print as ugly black bands. By rendering the receipt template in pure{" "}
        <code>#000</code> monospace text with dashed ASCII dividers, tabular right-aligned price
        columns, and SVG barcodes, the output looks crisp on every 203 DPI thermal head and can be
        triggered immediately on sale completion via <code>window.print()</code> (with Chrome&apos;s{" "}
        <code>--kiosk-printing</code> flag enabled on dedicated register terminals to skip the print
        preview dialog).
      </p>

      <h2 id="mistakes-i-would-not-repeat">Mistakes I Would Not Repeat</h2>
      <ul>
        <li>
          <strong>Treating product variants as separate flat products initially:</strong> Early on,
          different sizes or colors of an item were modeled as independent rows. Moving to a parent{" "}
          <code>products</code> table with child <code>product_variants</code> (each holding its own
          SKU, barcode, and stock count) made catalog edits and reporting much cleaner.
        </li>
        <li>
          <strong>Underestimating CSV import messiness:</strong> Real shopkeepers migrate from Excel
          sheets full of duplicate barcodes, currency symbols inside price cells (`$12.50`), and
          mixed character encodings. Building a forgiving staging importer with row-by-row validation
          previews before committing to the database saved hours of onboarding support.
        </li>
      </ul>

      <h2 id="architecture-summary">Architecture Summary</h2>
      <p>
        From top to bottom, Tillqorin POS stays intentionally boring where money and inventory are
        concerned: a fast <strong>React + Vite + Tailwind CSS</strong> register interface in the
        browser, a stateless <strong>Node.js + Express</strong> API enforcing authentication, role
        permissions, and idempotency, and <strong>Supabase (PostgreSQL)</strong> handling row-level
        locking, transactional checkout RPCs, and real-time stock synchronization across terminals.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>
      <p>
        <strong>Why did you choose React + Vite over Next.js for Tillqorin POS?</strong>
        <br />A POS register is an authenticated, long-lived single-page workspace behind a login
        screen. It does not need public URL indexing, and a Vite SPA keeps the client bundle lean
        and fast for barcode-scanner and keyboard-driven checkout workflows.
      </p>
      <p>
        <strong>Why keep an Express API server when using Supabase?</strong>
        <br />
        Transactional multi-table checkouts, server-side invoice number sequences, and background
        jobs like email receipts and CSV exports are cleaner to test, version, and secure in a
        dedicated Node.js + Express layer than scattering logic across client calls.
      </p>
      <p>
        <strong>How does thermal receipt printing work from a browser?</strong>
        <br />
        Tillqorin uses dedicated print stylesheets (<code>@media print</code>) sized to 80mm and
        58mm thermal rolls with monospace alignment, zero margins, and page-break controls so
        cashiers can print cleanly through the standard browser print dialog.
      </p>

      <p>
        Explore the <Link href="/projects/tillqorin">full Tillqorin POS case study</Link> or try the
        live platform at{" "}
        <a href="https://pos.taylancetech.com" target="_blank" rel="noopener noreferrer">
          pos.taylancetech.com
        </a>
        . If you are building a custom POS, inventory system, B2B SaaS, or internal commerce tool,{" "}
        <Link href="/contact">get in touch</Link> to discuss your architecture and timeline.
      </p>
    </>
  )
}

# Webmaster verification & indexing

Production site: **https://thisistayyab.dev**

Sitemap (submit in Search Console): **https://thisistayyab.dev/sitemap.xml**

## Google Search Console

1. Add property → URL prefix `https://thisistayyab.dev`
2. Choose **HTML tag** (easiest on Vercel):
   - Copy the `content="..."` value only
   - Set `GOOGLE_SITE_VERIFICATION` in Vercel → redeploy
3. Or choose **HTML file**:
   - Set `GOOGLE_SITE_VERIFICATION_FILE=googleXXXXXXXX.html` (exact filename)
   - Set `GOOGLE_SITE_VERIFICATION` to the same token Google shows
   - Redeploy — file is served at `https://thisistayyab.dev/googleXXXXXXXX.html`
4. Verify → **Sitemaps** → submit `sitemap.xml` → **URL inspection** → request indexing for `/`, `/about`, `/services`, `/contact`

## Bing Webmaster Tools

1. Add site `https://thisistayyab.dev`
2. **XML file** (already in repo): `public/BingSiteAuth.xml` → live at  
   `https://thisistayyab.dev/BingSiteAuth.xml` after deploy
3. In Bing, choose the XML file verification method and confirm that URL
4. Submit the same sitemap URL

Optional: use a meta tag instead — set `BING_SITE_VERIFICATION` in Vercel and remove `public/BingSiteAuth.xml` (only one method needed).

## After verification

Indexing and sitelinks are decided by Google/Bing over time. Verification only proves you own the site.

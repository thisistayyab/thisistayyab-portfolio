import React, { useEffect, useRef } from 'react';

const RippleBackground = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    // Configuration
    // Lower resolution for performance, scaled up by CSS
    const resolution = 0.4;
    const damping = 0.96;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let buffer1, buffer2, aux;

        // Initialize buffers
        const init = () => {
            width = Math.floor(window.innerWidth * resolution);
            height = Math.floor(window.innerHeight * resolution);
            canvas.width = width;
            canvas.height = height;

            const size = width * height;
            buffer1 = new Int16Array(size);
            buffer2 = new Int16Array(size);
        };

        const processRipples = () => {
            // Create image data to draw directly
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;

            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    const index = y * width + x;

                    // Averaging neighbor values
                    let val = (
                        buffer1[index - 1] +
                        buffer1[index + 1] +
                        buffer1[index - width] +
                        buffer1[index + width]
                    ) >> 1; // Divide by 2

                    val -= buffer2[index];
                    val -= val >> 5; // Damping (approx * 0.96)

                    buffer2[index] = val;

                    // Render logic: visualize the wave height
                    // Calculate shading to simulate 3D effect (emboss)
                    // Light comes from top-left
                    const valDiff = val - buffer2[index + 1];

                    // We only modify alpha/color where there is a wave
                    if (val !== 0) {
                        const index4 = index * 4;
                        // Highlight (positive diff) and Shadow (negative diff)
                        // Base color is transparent, we add white highlights
                        let intensity = valDiff;
                        if (intensity > 255) intensity = 255;
                        if (intensity < -255) intensity = -255;

                        // Simple render: Light blueish/white for crests
                        // data[index4] = 100; // R
                        // data[index4 + 1] = 150; // G
                        // data[index4 + 2] = 255; // B

                        // Smoother "Glassy" look: mainly playing with Alpha or Lightness
                        // Glassy effect: Pure white highlights for crests, subtle shadow for troughs
                        if (valDiff > 0) {
                            // Highlight (Crest) - Pure White
                            data[index4] = 255;
                            data[index4 + 1] = 255;
                            data[index4 + 2] = 255;
                            // Alpha matches steepness of the wave
                            data[index4 + 3] = valDiff;
                        } else {
                            // Shadow (Trough) - Faint black
                            // This adds depth and contrast ("glassy" look)
                            data[index4] = 0;
                            data[index4 + 1] = 0;
                            data[index4 + 2] = 0;
                            data[index4 + 3] = Math.abs(valDiff) * 0.1; // Much lighter shadow
                        }
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);

            // Swap buffers
            aux = buffer1;
            buffer1 = buffer2;
            buffer2 = aux;

            animationRef.current = requestAnimationFrame(processRipples);
        };

        const handleMouseMove = (e) => {
            const x = Math.floor(e.clientX * resolution);
            const y = Math.floor(e.clientY * resolution);

            if (x > 1 && x < width - 1 && y > 1 && y < height - 1) {
                // Inject energy into buffer1
                // Make the splash bigger by affecting neighbors
                const radius = 4;
                const splashStrength = 600;

                for (let j = -radius; j <= radius; j++) {
                    for (let i = -radius; i <= radius; i++) {
                        if (x + i > 0 && x + i < width && y + j > 0 && y + j < height) {
                            // Circular shape splash
                            if (i * i + j * j <= radius * radius) {
                                buffer1[(y + j) * width + (x + i)] = splashStrength;
                            }
                        }
                    }
                }
            }
        };

        init();
        window.addEventListener('resize', init);
        window.addEventListener('mousemove', handleMouseMove);

        processRipples();

        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                // CSS scaling to make the low-res canvas cover the screen
                imageRendering: 'auto'
            }}
        />
    );
};

export default RippleBackground;

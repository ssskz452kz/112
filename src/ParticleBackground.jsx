import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let mouse = { x: -1000, y: -1000, radius: 180 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        
        const handleResize = () => {
             width = window.innerWidth;
             height = window.innerHeight;
             canvas.width = width;
             canvas.height = height;
             init();
        };
        window.addEventListener('resize', handleResize);

        class Particle {
            constructor(x, y, color, distance, angle) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                
                this.vx = 0;
                this.vy = 0;
                
                // Dash sizes matching Antigravity
                this.particleWidth = Math.random() * 6 + 3; 
                this.particleHeight = Math.random() * 1.5 + 1.2; 
                
                this.color = color;
                this.density = (Math.random() * 0.8) + 0.2; 
                
                this.angle = angle;
                this.distance = distance;
                this.rotationOffset = 0; // Exactly radial (pointing outward from center)
            }
            
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                
                // Point tangent/radial to center
                const angleFromCenter = Math.atan2(this.y - height/2, this.x - width/2);
                ctx.rotate(angleFromCenter + this.rotationOffset);
                
                ctx.fillStyle = this.color;
                ctx.beginPath();
                if(ctx.roundRect) {
                    ctx.roundRect(-this.particleWidth/2, -this.particleHeight/2, this.particleWidth, this.particleHeight, this.particleHeight);
                } else {
                    ctx.rect(-this.particleWidth/2, -this.particleHeight/2, this.particleWidth, this.particleHeight);
                }
                ctx.fill();
                ctx.restore();
            }
            
            update() {
                // Very slow ambient rotation
                this.angle += 0.0004;
                this.baseX = width/2 + Math.cos(this.angle) * this.distance;
                this.baseY = height/2 + Math.sin(this.angle) * this.distance;

                // Mouse repel logic
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distanceToMouse = Math.hypot(dx, dy);
                
                if (distanceToMouse < mouse.radius) {
                    let forceDirectionX = dx / distanceToMouse;
                    let forceDirectionY = dy / distanceToMouse;
                    let force = (mouse.radius - distanceToMouse) / mouse.radius;
                    
                    this.vx -= forceDirectionX * force * this.density;
                    this.vy -= forceDirectionY * force * this.density;
                }
                
                // Spring force to anchor
                this.vx += (this.baseX - this.x) * 0.04;
                this.vy += (this.baseY - this.y) * 0.04;
                
                // Friction
                this.vx *= 0.85;
                this.vy *= 0.85;

                this.x += this.vx;
                this.y += this.vy;
                
                this.draw();
            }
        }

        let particleArray = [];
        
        const init = () => {
            particleArray = [];
            
            const numParticles = 1600; 
            
            const colors = [
                '#4285F4', '#EA4335', '#FBBC05', '#34A853',
                '#8AB4F8', '#FCE8E6', '#CEEAD6', '#D2E3FC'
            ];
            
            // KEY FIX: The "Hollow Center" (Radius hole) 
            // This is exactly why antigravity looks breathable and yours looked totally saturated.
            const R0 = Math.min(width, height) * 0.40; // 40% of screen is hollow
            const densityMultiplier = Math.max(width, height) * 1.5; 
            
            for (let i = 0; i < numParticles; i++) {
                // Fibonacci
                const angle = i * 137.508 * (Math.PI / 180);
                
                // Calculate radius maintaining equal density OUTSIDE the hollow center
                const radiusDist = Math.sqrt(R0 * R0 + densityMultiplier * i);
                
                // Add slight organic noise to distance so it doesn't look like a perfect machine cutout
                const noisyRadius = radiusDist + (Math.random() * 20 - 10);
                
                const x = width / 2 + Math.cos(angle) * noisyRadius;
                const y = height / 2 + Math.sin(angle) * noisyRadius;
                
                const color = colors[Math.floor(Math.random() * colors.length)];
                particleArray.push(new Particle(x, y, color, noisyRadius, angle));
            }
        };

        init();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particleArray.length; i++) {
                particleArray[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -10,
                pointerEvents: 'none',
                opacity: 0.9
            }}
        />
    );
};

export default ParticleBackground;

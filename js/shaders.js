var shaders = 
{
    "darkVisionFragment":
    {
        get:function()
        {
            return `precision mediump float;

            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            uniform float time;

            void main() {
                vec4 color = texture2D(uSampler, vTextureCoord);

                // Convert to grayscale
                float gray = (color.r + color.g + color.b) / 3.0;

                // Apply green tint
                vec3 nightVisionColor = vec3(0.1, 0.1, 0.1) * gray;

                // Add a pulsating effect for realism
                float noise = sin(time * 3.0) * 0.02;
                nightVisionColor += vec3(noise);

                gl_FragColor = vec4(nightVisionColor, color.a);
            }`;
        }
    },

    "nightVisionFragment":
    {
        get:function()
        {
            return `precision mediump float;

            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            uniform float time;

            void main() {
                vec4 color = texture2D(uSampler, vTextureCoord);

                // Convert to grayscale
                float gray = (color.r + color.g + color.b) / 3.0;

                // Apply green tint
                vec3 nightVisionColor = vec3(0.1, 1.0, 0.1) * gray;

                // Add a pulsating effect for realism
                float noise = sin(time * 3.0) * 0.02;
                nightVisionColor += vec3(noise);

                gl_FragColor = vec4(nightVisionColor, color.a);
            }`;
        }
    },

    "staticFragment":
    {
        get:function()
        {
            return `precision mediump float;

            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            uniform float time;
            
            void main() {
                vec4 color = texture2D(uSampler, vTextureCoord);
            
                // Convert to grayscale
                float gray = (color.r + color.g + color.b) / 3.0;
            
                // Add a pulsating effect for realism
                float noise = sin(time * 3.0) * 0.02;
                gray += noise;
            
                gl_FragColor = vec4(gray, gray, gray, color.a);
            }
            `;
        }
    },

    "infraredFragment":
    {
        get:function()
        {
            return `precision mediump float;
            
            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            
            void main() {
                // Get the texture color at the current pixel
                vec4 color = texture2D(uSampler, vTextureCoord);
            
                // Convert to grayscale to simulate heat intensity
                float intensity = (color.r + color.g + color.b) / 3.0;
            
                // Map intensity to infrared colors
                vec3 infraredColor;
                if (intensity < 0.33) {
                    // Cooler areas: Dark Blue to Blue
                    infraredColor = mix(vec3(0.0, 0.0, 0.5), vec3(0.0, 0.0, 1.0), intensity / 0.33);
                } else if (intensity < 0.66) {
                    // Moderate temperatures: Blue to Green
                    infraredColor = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0), (intensity - 0.33) / 0.33);
                } else {
                    // Hotter areas: Green to Red
                    infraredColor = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 0.0), (intensity - 0.66) / 0.34);
                }
            
                // Output the final color
                gl_FragColor = vec4(infraredColor, color.a);
            }
            `;
        }
    },

    "ultravioletFragment":
    {
        get:function()
        {
            return `precision mediump float;

            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            
            void main() {
                // Get the texture color at the current pixel
                vec4 color = texture2D(uSampler, vTextureCoord);
            
                // Convert to grayscale to determine intensity
                float intensity = (color.r + color.g + color.b) / 3.0;
            
                // Map intensity to white, red, and black
                vec3 predatorColor;
                if (intensity < 0.5) {
                    // Low intensity: Black to Red
                    predatorColor = mix(vec3(0.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0), intensity * 2.0);
                } else {
                    // High intensity: Red to White
                    predatorColor = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0), (intensity - 0.5) * 2.0);
                }
            
                // Output the final color
                gl_FragColor = vec4(predatorColor, color.a);
            }`;
        }
    },

    "heatDistortionFragment":
    {
        get:function()
        {
            return `precision mediump float;

            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            uniform float time;

            void main() {
                vec2 uv = vTextureCoord;
                
                // Heat distortion effect
                float wave = sin(uv.y * 10.0 + time) * 0.1 + sin(uv.x * 10.0 + time) * 0.1;
                uv += wave;
                
                vec4 color = texture2D(uSampler, uv);
                gl_FragColor = color;
            }`;
        }
    },

    "crtFragment":
    {
        get:function()
        {
            return `precision mediump float;

            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            uniform float time;
            
            void main() {
                vec4 color = texture2D(uSampler, vTextureCoord);
                
                // Add scanlines
                float scanline = sin(vTextureCoord.y * 20.0 + time * 10.0) * 0.5 + 0.5;
                vec3 scanlineColor = vec3(0.0, 0.0, 0.0) * scanline;
                
                gl_FragColor = vec4(color.rgb + scanlineColor, color.a);
            }
            
            `;
        }
    },

    "blackAndWhiteFragment": {
        get: function() {
            return `
                precision mediump float;
    
                varying vec2 vTextureCoord;
                uniform sampler2D uSampler;
                uniform float time; // Transition factor: 0.0 = full color, 1.0 = full dark grayscale
    
                void main() {
                    vec4 color = texture2D(uSampler, vTextureCoord);
    
                    // Compute average for grayscale
                    float gray = (color.r + color.g + color.b) / 3.0;
    
                    // Darken the grayscale
                    gray *= 0.2;
    
                    // Blend original color with dark grayscale based on time
                    vec3 finalColor = mix(color.rgb, vec3(gray), clamp(time, 0.0, 1.0));
    
                    gl_FragColor = vec4(finalColor, color.a);
                }
            `;
        }
    }    
}
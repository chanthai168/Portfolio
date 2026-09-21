precision mediump float;

uniform vec2 uResolution;

uniform float uTime;

uniform vec2 uMouse;

float random(vec2 position) {
    return fract(
        sin(
            dot(
                position,
                vec2(12.9898, 78.233)
            )
        ) * 43758.5453
    );
}

float noise(vec2 position) {
    vec2 grid = floor(position);
    vec2 local = fract(position);

    vec2 smoothLocal =
        local * local * (3.0 - 2.0 * local);

    float a = random(grid);
    float b = random(grid + vec2(1.0, 0.0));
    float c = random(grid + vec2(0.0, 1.0));
    float d = random(grid + vec2(1.0, 1.0));

    float top = mix(a, b, smoothLocal.x);
    float bottom = mix(c, d, smoothLocal.x);

    return mix(top, bottom, smoothLocal.y);
}

float fbm(vec2 position) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for(int i = 0;i < 5 ; i++){
        value += noise(position * frequency) * amplitude;

        frequency *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 mouseUv = uMouse/uResolution;
    vec2 baseCenter = vec2(0.5);
    // Optional gentle idle movement
    baseCenter += vec2(
        sin(uTime * 0.7) * 0.03,
        cos(uTime * 0.5) * 0.02
    );
    vec2 mouseOffset = mouseUv - baseCenter ;

    float maxOffset = 0.05;          
    vec2 limitedOffset = clamp(mouseOffset, -maxOffset, maxOffset) * 0.6;

    vec2 maskCenter = baseCenter + limitedOffset;

    float distanceFromCenter = distance(uv,maskCenter);
    float maskEffect = sin(uv.x * 10.0 + uTime);

    float mask = 1.0 - smoothstep(
        0.2,
        0.3,
        distanceFromCenter
    );

    float glowMask = 1.0 - smoothstep(
        0.2,
        0.5,
        distanceFromCenter
    );

    float glow =glowMask -  mask;
    float glowNoise = max(fbm( vec2(10.0,10.0)  ), 0.5);
    glow = glowMask * glowNoise;

    mouseOffset = (uv - mouseUv) * 3.0;
    float mouseDistance = length(mouseOffset) * 2.0;
    float mouseInfluence = 1.0 - smoothstep(
        0.0,
        0.8,
        mouseDistance
    );

    vec2 distortion = vec2(fbm(uv * 0.2 + uTime * 0.1), fbm(uv * 2.0 + vec2(5.2, 1.3) + uTime * 0.1));

    vec2 distortedUV = uv + (distortion - 0.5 ) * 0.8;


    // add mouse distortion 
    distortedUV += mouseOffset * mouseInfluence * 0.3;

    float scaleFactor = 8.0 ;
    vec2 offsetMovingSpeed = vec2(uTime * 0.05,uTime * 0.08);
    float value = fbm(distortedUV * scaleFactor + offsetMovingSpeed);

    value = smoothstep(
        0.45,
        0.7,
        value
    );

    vec3 c1 = vec3(0.0588, 0.3686, 0.6118); // #0f5e9c
    vec3 c2 = vec3(0.1373, 0.5373, 0.8549); // #2389da
    vec3 c3 = vec3(0.1098, 0.6392, 0.9255); // #1ca3ec
    vec3 c4 = vec3(0.3529, 0.7373, 0.8471); // #5abcd8
    vec3 c5 = vec3(0.4549, 0.8000, 0.9569); // #74ccf4

    vec3 color = mix(c1,c5,value);
    color *= max(glow,0.5);

    vec3 glowColor = vec3(
        0.1,
        0.0,
        1.0
    );

    float pulse = 0.8 + sin(uTime * 2.0) * 0.2;

    color += glow * glowColor * 0.5 * pulse;

    gl_FragColor = vec4(
        color,
        1.0
    );
}
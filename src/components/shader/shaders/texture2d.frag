precision mediump float;

uniform vec2 uResolution;
uniform sampler2D uTexture;
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

vec3 colorGradient(vec2 uv){
    vec3 topColor = vec3(
        1.0,
        0.4,
        0.4
    );

    vec3 bottomColor = vec3(
        0.4,
        0.4,
        1.0
    );

    vec3 color = mix(
        bottomColor,
        topColor,
        uv.y
    );

    return color;
}

float sampleAlpha(
    sampler2D textureSampler,
    vec2 uv
) {
    return texture2D(
        textureSampler,
        uv
    ).a;
}

vec4 blur5(
    sampler2D textureSampler,
    vec2 uv,
    vec2 texelSize
) {
    vec4 center = texture2D(
        textureSampler,
        uv
    );

    vec4 left = texture2D(
        textureSampler,
        uv - vec2(texelSize.x, 0.0) * 2.0
    );

    vec4 right = texture2D(
        textureSampler,
        uv + vec2(texelSize.x, 0.0) * 2.0
    );

    vec4 up = texture2D(
        textureSampler,
        uv + vec2(0.0, texelSize.y) * 2.0
    );

    vec4 down = texture2D(
        textureSampler,
        uv - vec2(0.0, texelSize.y) * 2.0
    );

    return (
          center * 0.4
        + left   * 0.15
        + right  * 0.15
        + up     * 0.15
        + down   * 0.15
    );
}

float blurAlpha(
    sampler2D textureSampler,
    vec2 uv,
    vec2 texelSize,
    float radius
) {
    float center = sampleAlpha(
        textureSampler,
        uv
    );

    float left = sampleAlpha(
        textureSampler,
        uv - vec2(texelSize.x, 0.0) * radius
    );

    float right = sampleAlpha(
        textureSampler,
        uv + vec2(texelSize.x, 0.0) * radius
    );

    float up = sampleAlpha(
        textureSampler,
        uv + vec2(0.0, texelSize.y) * radius
    );

    float down = sampleAlpha(
        textureSampler,
        uv - vec2(0.0, texelSize.y) * radius
    );

    return (
          center * 0.4
        + left   * 0.15
        + right  * 0.15
        + up     * 0.15
        + down   * 0.15
    );
}

void main(){
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 mouseUv = uMouse/uResolution;
    vec2 texelSize = 1.0 / uResolution;

    vec2 distortion = vec2(fbm(uv * 0.2 + uTime * 0.1), fbm(uv * 2.0 + vec2(5.2, 1.3) + uTime * 0.1));

    vec2 distortedUV = uv + (distortion - 0.5 ) * 0.2;

    vec2 mouseOffset = (uv - mouseUv) ;
    float mouseDistance = length(mouseOffset) ;
    float mouseInfluence = smoothstep(
        0.0,
        0.5,
        mouseDistance
    );
    // near from mouse get max effect 
    // far from mouse get min effect 
    // uv that 0.3 far from mouse recieve nothing 


    // aplly distortion animation 
    uv = distortedUV ;

    // aplly mouse interaction 
    uv += mouseOffset * mouseInfluence * 0.2;

    // scale 2*
    float scale = 0.8;
    uv = (uv - 0.5) / scale + 0.5;
    uv.y = -uv.y + 1.0;

    vec4 baseColor = texture2D(uTexture, uv);

    vec4 blurred = blur5(
        uTexture,
        uv,
        texelSize
    );

    float originalMask =
    baseColor.a;

    float blurredMask =
        blurAlpha(
            uTexture,
            uv,
            texelSize,
            40.0
        );

    float glowMask = max(
        blurredMask - originalMask,
        0.0
    );

    vec3 glowColor = vec3(0.4,0.7,1.0);

    glowColor *= glowMask;

    vec3 finalRGB = baseColor.rgb;

    finalRGB += glowColor;

    gl_FragColor = vec4(vec3(finalRGB), baseColor.a );
}
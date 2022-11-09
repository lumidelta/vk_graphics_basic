#version 450
#extension GL_ARB_separate_shader_objects : enable
#extension GL_GOOGLE_include_directive : require

#include "common.h"

struct Light {
	vec4 position;
	vec3 color;
};

layout(location = 0) out vec4 out_fragColor;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;

layout(binding = 0, set = 0) uniform AppData
{
  UniformParams Params;
};

layout(std430, binding = 1) buffer LightInfo {
    Light lights[];
};

layout (binding = 2) uniform sampler2D gPosition;
layout (binding = 3) uniform sampler2D gNormals;
layout (binding = 4) uniform sampler2D gColors;

void main()
{
  vec3 pos = texture(gPosition, surf.texCoord).rgb;
  vec3 norm = texture(gNormals, surf.texCoord).rgb;
  vec3 color = texture(gColors, surf.texCoord).rgb;

  // Ambient part
  vec3 fragcolor  = 0.5 * color;
  
  for(int i = 0; i < Params.lightNumber; ++i)
  {
	vec3 L = normalize(lights[i].position.xyz - pos);
	vec3 N = normalize(norm);
	float NL = max(0.0, dot(N, L));
	vec3 diff = lights[i].color * color * NL ;

	fragcolor += diff;	
  }

  out_fragColor = vec4(fragcolor, 1.0);
}


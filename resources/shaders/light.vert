
#version 450
#extension GL_ARB_separate_shader_objects : enable
#extension GL_GOOGLE_include_directive : require

#include "unpack_attributes.h"
/*
vec2 positions[3] = vec2[](
    vec2(-1.0, 2.0),
    vec2(3.0, 0.0),
    vec2(-1.0, -2.0)
);*/

vec2 positions[3] = vec2[](
    vec2(1.0, 1.0),
    vec2(0.0, -1.0),
    vec2(-1.0, 1.0)
);
layout(location = 0) in vec4 vPosNorm;
layout(location = 1) in vec4 vTexCoordAndTang;


layout (location = 0 ) out VS_OUT
{
    vec2 texCoord;
} vOut;

out gl_PerVertex { vec4 gl_Position; };
void main(void)
{
    vOut.texCoord = vec2((gl_VertexIndex << 1) & 2, gl_VertexIndex & 2);
	gl_Position = vec4(vOut.texCoord * 2.0f - 1.0f, 0.0f, 1.0f);
}

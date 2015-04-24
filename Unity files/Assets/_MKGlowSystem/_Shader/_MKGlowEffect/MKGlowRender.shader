Shader "Hidden/MKGlowRender"
{
	SubShader 
	{
		Tags { "RenderType"="MKGlow" "Queue"="Transparent"}		
		Pass 
		{
			ZTest LEqual 
			Fog { Mode Off }
			ColorMask RGB
			Cull Off
			Lighting Off
			ZWrite On
			
			CGPROGRAM
			#pragma target 2.0
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#include "UnityCG.cginc"
					
			sampler2D _MKGlowTex;
			fixed4 _MKGlowColor;
			half _MKGlowPower;
			half _MKGlowTexPower;
			float _MKGlowOffSet;
			
			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
				float3 normal : NORMAL;
			};
			
			struct Output 
			{
				float4 pos : POSITION;
				float2 uv : TEXCOORD0;
			};
			
			Output vert (Input i)
			{
				Output o;
				i.vertex.xyz += i.normal * _MKGlowOffSet;
				o.pos = mul (UNITY_MATRIX_MVP, i.vertex);
				o.uv = MultiplyUV (UNITY_MATRIX_TEXTURE0, i.texcoord.xy);
				return o;
			}

			fixed4 frag (Output i) : SV_Target
			{
				fixed4 glow = tex2D(_MKGlowTex, i.uv);	
				glow *= (_MKGlowColor * _MKGlowPower);
				//return (glow.a * _MKGlowColor.a) * (_MKGlowPower * _MKGlowColor  * glow);
				return (_MKGlowPower * _MKGlowColor  * glow);
			}
			ENDCG
		}
	}
	SubShader 
	{
		Tags { "RenderType"="Opaque" }
		
		Pass {
			Fog { Mode Off }
			Color (0,0,0,0)
		}
	} 
} 


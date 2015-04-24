Shader "Hidden/MKGlowBlur" 
{
	Properties 
	{
		_MainTex ("", 2D) = "white" {}
		_Color ("Color", color) = (1,1,1,0)
	}
	Subshader 
	{
		ZTest LEqual 
		Fog { Mode Off }
		ColorMask RGB
		Cull Off
		Lighting Off
		ZWrite Off

		Pass 
		{
			CGPROGRAM
			#pragma target 2.0
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#include "UnityCG.cginc"
			
			sampler2D _MainTex;
			fixed4 _Color;
			
			struct Input
			{
				float4 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
			};

			struct Output 
			{
				float4 pos : SV_POSITION;
				half4 uv[2] : TEXCOORD0;
			};

			float4 _MainTex_TexelSize;
			float4 _BlurOffsets;

			Output vert (Input v)
			{
				Output o;
				float offX = _MainTex_TexelSize.x * _BlurOffsets.x;
				float offY = _MainTex_TexelSize.y * _BlurOffsets.y;

				o.pos = mul (UNITY_MATRIX_MVP, v.vertex);
				float2 uv = MultiplyUV (UNITY_MATRIX_TEXTURE0, v.texcoord.xy-float2(offX, offY));
			
				o.uv[0].xy = uv + float2( offX, offY);
				o.uv[0].zw = uv + float2(-offX, offY);
				o.uv[1].xy = uv + float2( offX,-offY);
				o.uv[1].zw = uv + float2(-offX,-offY);
				return o;
			}
			

			fixed4 frag( Output i ) : SV_Target
			{
				fixed4 c;
				c  = tex2D( _MainTex, i.uv[0].xy );
				c += tex2D( _MainTex, i.uv[0].zw );
				c += tex2D( _MainTex, i.uv[1].xy );
				c += tex2D( _MainTex, i.uv[1].zw );
				return c * _Color.a;
			}
			ENDCG
		}
	}
	Fallback off
}
Shader "Hidden/MKGlowCompose" 
{
	Properties 
	{
		_MainTex ("", 2D) = "black" {}
	}
	Subshader 
	{
		Blend One One
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
			
			sampler2D _MainTex;
			struct Input
			{
				float4 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
			};
			
			struct Output 
			{
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
			};
			
			Output vert (Input i)
			{
				Output o;
				o.pos = mul (UNITY_MATRIX_MVP, i.vertex);
				o.uv = i.texcoord;
				return o;
			}

			fixed4 frag( Output i ) : Color
			{
				fixed4 d = tex2D( _MainTex, i.uv );
				return d;
			}
			ENDCG
		}
	}
	Fallback off
}
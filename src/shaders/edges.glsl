uniform float uCurrentEdge;
uniform float uPreviousEdge;

vec2 getOffsetPosition( vec3 position, float uHeight, float uSteps){

  float start = (uHeight / uSteps) *3.;

  // edge 1 beveled
  if(uCurrentEdge == 1.){
    if(position.z > uVerticalEdgeThickness){
      return -normal2D.xy * ( uVerticalEdgeThickness - position.z) * uInsetBottom;
    }
  }

  // edge 2 trapese
  if(uCurrentEdge == 2.){
    if(position.z > start){
      return -normal2D.xy * (start - position.z);
    }
  }

  // top edge bevel
  if(position.z < start){
     return normal2D.xy  *(start - position.z);
  }


  return vec2(0.);
}

vec2 alignUVsAfterOffset(vec2 vUv,vec3 vCustomNormal){
    // Calculate the offset based on normal2D
  float start = (uHeight / uSteps) *3.;
  vec2 offset = normal2D.xy * (uVerticalEdgeThickness - position.z)* uInsetBottom;
  vec2 topOffset = normal2D.xy  *(start - position.z);
  vec2 offset2=  normal2D.xy * (start - position.z);


  // edge 1 beveled
  if(uCurrentEdge == 1.){
    if(position.z > uVerticalEdgeThickness){
      if(abs(vCustomNormal.x)== 1.){
        vUv.y -= offset.y;
      }
      if(abs(vCustomNormal.y )== 1.){
        vUv.x -= offset.x;
      }

      if(abs(vCustomNormal.z) == 1.){
        vUv += offset;   
      }
    }
  }

  // edge 2 trapese
  if(uCurrentEdge == 2.){
    if(position.z > start){
      if(abs(vCustomNormal.x) > 0.7){
        vUv.y -= offset2.y;
      }
      if(abs(vCustomNormal.y )> 0.7){
        vUv.x -= offset2.x;
      }
    }
  }
    
  // top edge bevel
  if(position.z < start){
    if(abs(vCustomNormal.x) > 0.){
      vUv.y += topOffset.y;
      vUv.x += topOffset.x;
    }
    if(abs(vCustomNormal.y )> 0.){
      vUv.x += topOffset.x;
      vUv.y += topOffset.y;
    }

    if(abs(vCustomNormal.z) == 1.){
      vUv += topOffset;   
    }
  }

  vUv *= 0.35;

  return vUv;

}
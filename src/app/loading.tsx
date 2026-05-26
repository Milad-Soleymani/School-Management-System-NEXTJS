import React from 'react'

function loading() {

    return (
 <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      {/* لودر با رنگ ثابت بنفش */}
      <div className="w-[120px] h-[20px] skew-x-[-45deg] bg-purple-300 relative overflow-hidden rounded">
        {/* نوار متحرک با رنگ آبی روشن */}
        <div
          className="absolute inset-0
                     [background:linear-gradient(#c3ebfa_0_0)_left_-30px_top_0/30px_20px_no-repeat_transparent] 
                     animate-loader"
        ></div>
      </div>
    </div>
    )
}

export default loading
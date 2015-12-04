function _rotate(point,center){
    this.point=typeof point=="object"?point:document.getElementById(pointId);
    this.center=typeof center=="object"?center:document.getElementById(centerId);
    this.oAngle=1;
    this.oTime=5;
    this.clockwise=true;
    this.calculateAnge=function(){
        var x=this.point.offsetLeft-this.center.offsetLeft;
        var y=this.point.offsetTop-this.center.offsetTop;
        this.r = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2));
        this.originAngle = 180/(Math.PI/Math.acos(x/this.r));
        if (y<0) {
            this.originAngle = -this.originAngle;
        } else if ((y == 0) && (x<0)) {
            this.originAngle = 180;
        }
    };
    this.calculateAnge();
    this.move=function(angle){
        var targetX=this.center.offsetLeft+Math.cos(Math.PI/180*(this.clockwise==true?this.originAngle+angle:this.originAngle-angle)) * this.r;
        var targetY=this.center.offsetTop+Math.sin(Math.PI/180*(this.clockwise==true?this.originAngle+angle:this.originAngle-angle)) * this.r;
        this.point.style.left=targetX+"px";
        this.point.style.top=targetY+"px";
        this.calculateAnge();
    };
    this.rotate=function(angle){
        if(!this.time){
            this.times=angle%this.oAngle==0?(angle/this.oAngle):(angle/this.oAngle+1);
            this.targetAngle=angle;
            this.time=1;
        }
        if((this.time*this.oAngle+5)==this.targetAngle){
            this.time=this.times=null;
        } else if(this.time<this.times){
            var moveAngle=(this.time+1)!=this.times?this.oAngle: angle%this.oAngle==0?this.oAngle:angle%this.oAngle;
            this.move(moveAngle);
            this.time++;
            var self=this;
            setTimeout(function(){ self.rotate(angle)},this.oTime);
        }
    };
    this.rotating=function(){
        this.move(this.oAngle);
        var self=this;
        setTimeout(function(){ self.rotating()},this.oTime);
    };
    this.setOAngle=function(oAngle){
        this.oAngle=oAngle;
    };
    this.getOAngle=function(){
        return this.oAngle;
    };
    this.setOTime=function(oTime){
        this.oTime=oTime;
    };
    this.getOTime=function(){
        return this.oTime;
    };
    this.setClockwise=function(clockwise){
        this.clockwise=clockwise;
    };
    this.getClockwise=function(){
        return this.clockwise;
    };
    this.setParams=function(oAngle,oTime,clockwise){
        this.oAngle=oAngle;
        this.oTime=oTime;
        this.clockwise=clockwise;
    }
}
function _rotateComplexTogether(pointIds,centerId){
    this.points=[];
    for(var i in pointIds){
       this.points.push(document.getElementById(pointIds[i]));
    }
    this.center=document.getElementById(centerId);
    this.oAngle=1;
    this.oTime=1;
    this.clockwise=true;
    this.rotate=function(){
        var self=this;
         setTimeout(
             function(){
                 if(!self.queue)
                     self.queue=0;

                     self.rotate();  if(self.queue<self.points.length) {
                         var ro = new _rotate(self.points[self.queue], self.center);
                         ro.setParams(self.oAngle,self.oTime,self.clockwise);
                         ro.rotate(360/self.points.length *(self.queue+1));
                         self.queue++;
                 }
             },
             0
        )
    };
    this.setOAngle=function(oAngle){
        this.oAngle=oAngle;
    };
    this.getOAngle=function(){
        return this.oAngle;
    };
    this.setOTime=function(oTime){
        this.oTime=oTime;
    };
    this.getOTime=function(){
        return this.oTime;
    };
    this.setClockwise=function(clockwise){
        this.clockwise=clockwise;
    };
    this.getClockwise=function(){
        return this.clockwise;
    };
    this.setParams=function(oAngle,oTime,clockwise){
        this.oAngle=oAngle;
        this.oTime=oTime;
        this.clockwise=clockwise;
    }
}
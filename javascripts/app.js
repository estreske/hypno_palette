var Ellipses = function(){
  this.canvas_view = new CanvasView();

  this.colors = [
    "#3FCEEE",
    "#FFFFFF",
    "#FF530D"
  ]

  this.document_width = $(document).width();

  this.document_height = $(document).height();

  this.paper = Raphael(
    this.canvas_view.el,
    this.document_width,
    this.document_height
    )

  
  // this.makeRecursiveEllipses(this.document_width/2 + 200, this.document_width/3 + 200);
  // this.animate();

  this.getColorPalette();
}

Ellipses.prototype.makeEllipse = function(horizontal_radius, vertical_radius){
  this.ellipse = this.paper.ellipse(
    this.document_width /2,
    this.document_height /2,
    horizontal_radius,
    vertical_radius
  )

  this.ellipse.attr("fill", "#" + this.palette[Math.floor(Math.random()*5)])
  this.ellipse.attr("stroke", "#000")
}

Ellipses.prototype.makeRecursiveEllipses = function(horizontal_radius, vertical_radius) {
  if (horizontal_radius <= 0 || vertical_radius <= 0) {
    return true;
  } else {
    this.makeEllipse(horizontal_radius, vertical_radius)
    return this.makeRecursiveEllipses(horizontal_radius - 10, vertical_radius - 10)
  }
};

Ellipses.prototype.reload = function(){

  this.paper.clear()
  this.makeRecursiveEllipses(this.document_width/2+200, this.document_width/3+200);

}

Ellipses.prototype.animate = function(){
  var self = this;
  this.interval = setInterval(function(){
    self.reload();
  },100)
}

Ellipses.prototype.getColorPalette = function(){

  var script_tag = [
    "<script src='",
      'http://www.colourlovers.com/api/palettes/random?format=json',
      "&jsonCallback=apiCallback",
    "'></script>"
  ]

  $('body').append(script_tag.join(""))

}

var apiCallback = function(data){
  ellipses.palette = data[0].colors 
  // console.log(data)

  ellipses.palette_meta = data[0]

  ellipses.animate();
}

var CanvasView = Backbone.View.extend({

  el: function(){
    return $('#canvas')
  }
})

$(function(){
  window.ellipses = new Ellipses();
})

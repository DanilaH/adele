(function () {
  'use strict';
  
  var Square = function() {
    this.setParameters();
  }

  Square.prototype.setParameters = function() {
    this.x = 0;
    this.y = 0;
    this.velocity = 1;
    this.height = 10;
    this.width = 10;
  }

  Square.prototype.render = function(ctx) {
    ctx.fillStyle = 'rgba(146, 148, 147, ' + (this.x * 100 / CanvasSize.WIDTH) / 100 + ')';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  Square.prototype.update = function () {
    this.x += this.velocity;

    if (this.x > CanvasSize.WIDTH) {
      this.x = 0;
    }
  };

  var cleanupFrame = function (ctx) {
    ctx.clearRect(0, 0, CanvasSize.WIDTH, CanvasSize.HEIGHT);
  };

  var renderFrame = function (ctx, squares) {
    cleanupFrame(ctx);

    squares.forEach(function (it) {
      it.render(ctx);
      it.update();
    });

    requestAnimationFrame(renderFrame.bind(null, ctx, squares));

  };


  var canvasTop = document.querySelector('.product__rects');
  var canvasBottom = document.querySelector('.box__rects');

  var CanvasSize = {
    WIDTH: canvasTop.getAttribute('width'),
    HEIGHT: canvasTop.getAttribute('height')
  };

  canvasBottom.setAttribute('width', CanvasSize.WIDTH);
  canvasBottom.setAttribute('height', CanvasSize.HEIGHT);

  var setup = function (canvas) {
    var ctx = canvas.getContext('2d');

    var squaresOnYCoord = 20;

    var makeSquares = function(squaresOnYCoord) {
      var squares = [];
      var squareYCoord = 0;
      var squareXCoord = 0;

      for (var i = 1; i <= squaresOnYCoord; i++){

        var square = new Square();
        square.y = squareYCoord;
        square.x = squareXCoord;
        squares.push(square);
        squareYCoord += 15;

        if (i === squaresOnYCoord && squareXCoord < CanvasSize.WIDTH) {
          squareXCoord += 15;
          squareYCoord = 0;
          i = 0;
        }
      }

      return squares;
    }

    var squares = makeSquares(squaresOnYCoord);

    renderFrame(ctx, squares);
  };

  setup(canvasTop);
  setup(canvasBottom);
})();

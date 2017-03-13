
class Scene{
    constructor(gl, canvas){

        this.gl = gl;
        this.canvas = canvas;
        this.skybox = new Skybox("textures/skybox/",this.gl);
        this.teapot = new Teapot("model/teapot.json",this.gl);
        this.plan = new Plan("model/plan.json",this.gl);
        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();

        this.tick();

    }

    tick() {
        var self = this;
        requestAnimFrame(function() { self.tick(); } );
        this.resizeCanvas();
        this.teapot.animate();
        this.drawScene();
    }

    drawScene(){
        //console.log("draw Call");
        this.gl.clearColor(0.1, 0.1, 0.1, 1.0);

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);

        mat4.identity(this.pMatrix);
        mat4.perspective(this.pMatrix, degToRad(70),this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 1000.0);

        mat4.identity(this.mvMatrix);

        this.skybox.draw(this.mvMatrix,this.pMatrix);

        mat4.translate(this.mvMatrix, this.mvMatrix, [0.0, -5.0, -45.0]);
        mat4.rotateX(this.mvMatrix, this.mvMatrix, 0.3);

        this.plan.draw(this.mvMatrix,this.pMatrix);

        this.teapot.draw(this.mvMatrix,this.pMatrix);

    }

    resizeCanvas() {
        var displayWidth = document.getElementById('container').clientWidth;
        var displayHeight = document.getElementById('container').clientHeight;

        if (this.gl.viewportWidth != displayWidth || this.gl.viewportHeight != displayHeight) {
            this.gl.viewportWidth = displayWidth;
            this.gl.viewportHeight = displayHeight;
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
    }
}




}

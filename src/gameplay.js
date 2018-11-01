var GRAVEDAD_Y=200;
var GRAVEDAD_XN = 0;
var AMOUNT_PLATAFORMAS = 2;
var AMOUNT_BASUREROS = 4;
var AMOUNT_REMOLINOS = 2;
var pantalla = 1;
var cant_plat_1 = 7;
var cant_tron_1 =4;
var flagResultEndGame=false;

var GamePlayManagerDesktop = {
    init: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setGameSize(window.innerWidth, window.innerHeight);

        

        this.flagDropBall=false;
        this.flagEndGame=false;
        this.isIpad=false;
        this.isPixel2XL=false;
    },
    create: function(){
        /********************************Materiales del juego*******************************************/
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = GRAVEDAD_Y;
        this.worldMaterial = game.physics.p2.createMaterial('worldMaterial');
        game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
        this.materialPlataforma = game.physics.p2.createMaterial('materialPlataforma');
        this.materialTronco = game.physics.p2.createMaterial('materialTronco');
        this.materialBasurero = game.physics.p2.createMaterial('materialBasurero');
        
        //Array de troncos
        this.troncos=[];
        //Array de plataformas
        this.plataformas=[];
        this.basureros=[];
        
        //Fondo 
        var fondo = game.add.sprite(0,0,'fondoDesktop');
        fondo.width = window.innerWidth;
        fondo.height = window.innerHeight;

        /*Comprobacion de formatos especificos**************************************************************************/


        /***********************************************************************************************************/
        



        //Bola
         this.tipoBola = 0/*Math.floor(Math.random() * 4)*/;
        var frameBola = Math.floor(Math.random() * 5);
        /*Size de la bola*/
            this.sizeBola = (window.innerWidth*5)/100;

        
        switch(this.tipoBola){
            case 0:
                this.bola_basura=game.add.sprite(window.innerWidth-100,0,'organicas',frameBola);
                break;
            case 1:
                this.bola_basura=game.add.sprite(window.innerWidth-100,0,'organicas',frameBola);
                //this.bola_basura=game.add.sprite(301,0,'vidrio',frameBola);
                break;
            case 2:
                this.bola_basura=game.add.sprite(window.innerWidth-100,0,'organicas',frameBola);
                //this.bola_basura=game.add.sprite(301,0,'plastico',frameBola);
                break;
            case 3:
                this.bola_basura=game.add.sprite(window.innerWidth-100,0,'organicas',frameBola);
                //this.bola_basura=game.add.sprite(301,0,'papel',frameBola);
                break;
        }
        this.bola_basura.width = this.sizeBola;
        this.bola_basura.height = this.sizeBola;
        
        //Plataformas
        var platLimpio1 = game.add.sprite(window.innerWidth,(window.innerHeight*13)/100,'platLimpio1');
        platLimpio1.width = (window.innerWidth*25)/100;
        platLimpio1.height = (window.innerHeight*3)/100;
        platLimpio1.x=(window.innerWidth)-(platLimpio1.width/3.5);

        var platLimpio2 = game.add.sprite((window.innerWidth*44.5)/100,(window.innerHeight*18.8)/100,'platLimpio2');
        platLimpio2.width = (window.innerWidth*38)/100;
        platLimpio2.height = (window.innerHeight*3)/100;
        
        var platLimpio3 = game.add.sprite((window.innerWidth*45)/100,(window.innerHeight*45)/100,'platLimpio3');
        platLimpio3.width = (window.innerWidth*50)/100;
        platLimpio3.height = (window.innerHeight*3)/100;
        
        var platLimpio4 = game.add.sprite((window.innerWidth*48)/100,(window.innerHeight*73)/100,'platLimpio4');
        platLimpio4.width = (window.innerWidth*48)/100;
        platLimpio4.height = (window.innerHeight*3)/100;
        
        var platLimpio5 = game.add.sprite((window.innerWidth*46)/100,(window.innerHeight*92)/100,'platLimpio5');
        platLimpio5.width = (window.innerWidth*58)/100;
        platLimpio5.height = (window.innerHeight*3)/100;

        var platBas1= game.add.sprite(window.innerWidth,(window.innerHeight*37)/100,'platBas1');
        platBas1.width = (window.innerWidth*65)/100;
        platBas1.height = (window.innerHeight*3)/100;

        var platBas2= game.add.sprite((window.innerWidth*0)/100,(window.innerHeight*81)/100,'platBas2');
        platBas2.width = (window.innerWidth*40)/100;
        platBas2.height = (window.innerHeight*3)/100;

        this.plataformas[1] = platLimpio1;
        this.plataformas[2] = platLimpio2;
        this.plataformas[3] = platLimpio3;
        this.plataformas[4] = platLimpio4;
        this.plataformas[5] = platLimpio5;
        this.plataformas[6] = platBas1;
        this.plataformas[7] = platBas2;
        
        /*Controloles individuales de plataformas*/    
        for(var i=1; i<=cant_plat_1; i++){
            this.plataformas[i].anchor.setTo(0.5);
            game.physics.p2.enable(this.plataformas[i]);
            switch(i){
                case 1:
                        this.plataformas[i].body.angle=-12;
                break;
                case 2:
                        this.plataformas[i].body.angle=10;
                break;
                case 3:
                        if(!this.isIpad&&!this.isPixel2XL){
                            this.plataformas[i].body.angle=10;
                            
                        }
                        else{
                            if (this.isPixel2XL) {
                                    this.plataformas[i].body.y=(window.innerHeight*42)/100;
                                    this.plataformas[i].body.angle=28;
                                }
                            if (this.isIpad) {
                                    this.plataformas[i].body.angle=24;    
                                }
                               
                        }
                break;
                case 4:
                        if(!this.isIpad&&!this.isPixel2XL){
                            this.plataformas[i].body.angle=-4;
                            
                        }
                        else{
                            if (this.isPixel2XL) {
                                    this.plataformas[i].body.angle=-10;
                                }
                            if (this.isIpad) {
                                    this.plataformas[i].body.angle=-6;    
                                }
                               
                        }
                        
                break;
                case 5:
                        if(!this.isIpad&&!this.isPixel2XL){
                            this.plataformas[i].body.angle=-4;
                            
                        }
                        else{
                            if (this.isPixel2XL) {
                                    this.plataformas[i].body.angle=-13;
                                }
                            if (this.isIpad) {
                                    this.plataformas[i].body.angle=-9;    
                                }
                               
                        }
                break;
                case 6:

                break
                case 7:

                break;
                default:

            }
            this.plataformas[i].body.setMaterial(this.materialPlataforma);
            this.plataformas[i].body.motionState=2;
            this.plataformas[i].body.mass=0;
        }

        /****BASUREROS****************************************************************************************************/
        this.bolaCollisionGroup = game.physics.p2.createCollisionGroup();
        this.basureroCollisionGroup = game.physics.p2.createCollisionGroup();


         var basurero_0 = game.add.sprite((window.innerWidth*74)/100,(window.innerHeight*31)/100,'basureros');
            basurero_0.frame = 0;
            var basurero_1 = game.add.sprite((window.innerWidth*10)/100,(window.innerHeight*53)/100,'basureros');
            basurero_1.frame = 1;
            var basurero_2 = game.add.sprite((window.innerWidth*9)/100,(window.innerHeight*75)/100,'basureros');
            basurero_2.frame = 2;
            var basurero_3 = game.add.sprite((window.innerWidth*86)/100,(window.innerHeight*98)/100,'basureros');
            basurero_3.frame = 3;

            //Esto es para hacer match con las basura correspondiente
            this.basureros[0] = basurero_0;
            this.basureros[0].id = 0;
            this.basureros[1] = basurero_1; 
            this.basureros[1].id = 1;
            this.basureros[2] = basurero_2; 
            this.basureros[2].id = 2;
            this.basureros[3] = basurero_3;  
            this.basureros[3].id = 3;

            for (var i = 0; i < this.basureros.length; i++) {
                this.basureros[i].width=(window.innerWidth*7)/100;
                this.basureros[i].height=(window.innerHeight*10)/100;
                game.physics.p2.enable(this.basureros[i],true);
                this.basureros[i].body.motionState=2;
                this.basureros[i].body.mass=0;
                this.basureros[i].body.clearShapes();
                this.basureros[i].body.setMaterial(this.materialBasurero);
                if(i==2){
                    this.basureros[i].body.angle=90;
                    this.basureros[i].height=(window.innerWidth*8)/100;
                    this.basureros[i].width=(window.innerHeight*11)/100;
                    this.basureros[i].body.x=(window.innerWidth*15)/100;
                }
                if(i==1){
                    this.basureros[i].width=(window.innerWidth*10)/100;
                    this.basureros[i].height=(window.innerHeight*15)/100;
                    this.basureros[i].body.y=(window.innerHeight*53)/100;
                    
                }
                if(i==3){
                    this.basureros[i].width=(window.innerWidth*15)/100;
                    this.basureros[i].height=(window.innerHeight*15)/100;
                    
                }

            }


        /*********Troncos*************************************************/
        

        /*Controloes individuales de cada tronco*/
        for (var i = 0; i < cant_tron_1; i++) {
            switch(i){
                case 0:
                    this.troncos[i]=game.add.sprite((window.innerWidth*74.8)/100,(window.innerHeight*21)/100,"tronco")
                    this.troncos[i].width = (window.innerWidth*12)/100;
                    this.troncos[i].height = (window.innerHeight*3.5)/100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle=-12;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);
                break;
                case 1:
                    this.troncos[i]=game.add.sprite((window.innerWidth*12)/100,(window.innerHeight*36)/100,"tronco2")
                    this.troncos[i].width = (window.innerWidth*20)/100;
                    this.troncos[i].height = (window.innerHeight*3.5)/100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle=0;
                break;
                case 2:
                    this.troncos[i]=game.add.sprite((window.innerWidth*82)/100,(window.innerHeight*65)/100,"tronco")
                    this.troncos[i].width = (window.innerWidth*20)/100;
                    this.troncos[i].height = (window.innerHeight*3)/100;
                    game.physics.p2.enable(this.troncos[i]);
                    if(this.isPixel2XL){
                        this.troncos[i].body.y=(window.innerHeight*66)/100;
                    }
                    this.troncos[i].body.angle=-10;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);
                break;
                case 3:
                    this.troncos[i]=game.add.sprite((window.innerWidth*84)/100,(window.innerHeight*83)/100,"tronco") 
                    this.troncos[i].width = (window.innerWidth*20)/100;
                    this.troncos[i].height = (window.innerHeight*3)/100;
                    game.physics.p2.enable(this.troncos[i]);
                    if(this.isPixel2XL){
                        this.troncos[i].body.y=(window.innerHeight*83)/100;
                    }
                    this.troncos[i].body.angle=-10;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);
                break;

                default:
                break;
            }
            this.troncos[i].body.setMaterial(this.materialPlataforma);
            this.troncos[i].name = i;
            this.troncos[i].inputEnabled = true;
            this.troncos[i].body.motionState=2;
            this.troncos[i].body.mass=0;
            this.troncos[i].activado = false;
            this.troncos[i].events.onInputDown.add(this.tocandoTronco,this);
        }
        var plataformaMundo = game.physics.p2.createContactMaterial(this.materialPlataforma, this.worldMaterial, { friction: 0 });
        game.input.onDown.add(this.onTap, this);
    },
    update: function(){
        if(this.flagEndGame){
        }
        else{
            if(this.flagDropBall){
                for (var i = 0; i < AMOUNT_BASUREROS; i++) {
                   var rectBola=this.getBounds(this.bola_basura);
                   var rectBas=this.getBounds(this.basureros[i]);

                   if (this.isRectanglesOverlapping(rectBola,rectBas)) {
                       if(this.tipoBola==this.basureros[i].id){
                          //this.showFinalMessage('Basurero correcto');
                            flagResultEndGame=true;
                            this.state.start('final');
                        }
                       else{
                           //this.showFinalMessage('Basurero incorrecto');
                           flagResultEndGame=false
                           this.state.start('final');
                       }
                      flagEndGame=true;
                   }
                }

                if (this.bola_basura.body.velocity.x>0) {
                    this.bola_basura.body.rotation+=0.1;
                }
                if (this.bola_basura.body.velocity.x<0) {
                   this.bola_basura.body.rotation-=0.1; 
                }
                
            }else{
                var pointerX=game.input.x;
                var distX=pointerX - this.bola_basura.x;
                this.bola_basura.x += distX * 0.02;
            }
        }
    },
    tocandoTronco: function(tronco){
         if(pantalla==1){
                    //tronco.body.moves = false;
                    if(!tronco.activado){
                        this.troncos[tronco.name].activado = true;
                        switch(tronco.name){
                            case 0: 
                                    this.troncos[tronco.name].body.angle=15;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*75)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*15)/100;
                                    this.troncos[tronco.name].width=(window.innerWidth*12)/100;
                                    this.troncos[tronco.name].body.clearShapes();
                                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                            break;
                            case 1: 
                                    this.troncos[tronco.name].body.angle=85;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*21)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*26)/100;
                                    this.troncos[tronco.name].width= (window.innerWidth*13)/100;
                                    this.troncos[tronco.name].body.clearShapes();
                                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                            break;
                            case 2: 
                                    this.troncos[tronco.name].body.angle=-60;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*77)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*57)/100;
                                    if (this.isPixel2XL) {
                                        this.troncos[tronco.name].body.y+=(window.innerHeight*3)/100;
                                    }
                            break;
                            case 3: 
                                    this.troncos[tronco.name].body.angle=-45;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*82)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*78)/100;
                                    if (this.isPixel2XL) {
                                        this.troncos[tronco.name].body.y=(window.innerHeight*81)/100;
                                    }
                            break;
                            default:
                        }
                        tronco.activado = true;
                    }else{
                        this.troncos[tronco.name].activado = false;
                        switch(tronco.name){
                            case 0: 
                                    this.troncos[tronco.name].body.angle=-12;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*74.8)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*21)/100;
                                    this.troncos[tronco.name].width=(window.innerWidth*12)/100;
                                    this.troncos[tronco.name].body.clearShapes();
                                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                            break;
                            case 1: 
                                    this.troncos[tronco.name].body.angle=0;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*12)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*36)/100;
                                    this.troncos[tronco.name].width= (window.innerWidth*20)/100;
                                    this.troncos[tronco.name].body.clearShapes();
                                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                            break;
                            case 2: 
                                    this.troncos[tronco.name].body.angle=-10;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*82)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*65)/100;
                                    if (this.isPixel2XL) {
                                        this.troncos[tronco.name].body.y=(window.innerHeight*66)/100;
                                    }
                            break;
                            case 3: 
                                    this.troncos[tronco.name].body.angle=-10;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*84)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*83)/100;
                                    if (this.isPixel2XL) {
                                        this.troncos[tronco.name].body.y=(window.innerHeight*83)/100;
                                    }
                            break;
                            default:
                        }
                        tronco.activado = false;
                    }    
        }
    },
    getBounds:function(currentPlataform){
        return new Phaser.Rectangle(currentPlataform.left, currentPlataform.top, currentPlataform.width, currentPlataform.height);
    },
    isRectanglesOverlapping: function(rect1, rect2) {
        if(rect1.x> rect2.x+rect2.width || rect2.x> rect1.x+rect1.width){
            return false;
        }
        if(rect1.y> rect2.y+rect2.height || rect2.y> rect1.y+rect1.height){
            return false;
        }
        return true;
    },
    render:function(){

    },
    onTap: function(){
       this.flagDropBall=true;
        game.physics.p2.enable(this.bola_basura);
        this.bola_basura.body.setCircle(this.sizeBola/2);
        this.materialBola = game.physics.p2.createMaterial('materialBola');
        this.bola_basura.body.setMaterial(this.materialBola);
        this.bola_basura.allowRotation=true;
        var plataformaBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialPlataforma, { friction: -3 });
        var troncoBola=game.physics.p2.createContactMaterial(this.materialBola, this.materialTronco, { friction:1});
    },
    showFinalMessage: function(msg){
        var bgAlpha = game.add.bitmapData(window.innerWidth, window.innerHeight);
        bgAlpha.ctx.fillStyle = '#FFFFFF';
        bgAlpha.ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
        
        var bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;
        
        var style = {
            font: 'bold 12pt Arial',
            fill: '#FFFFFF',
            align: 'center'
          }
        
        this.textFieldFinalMsg = game.add.text(game.width/2, game.height/2, msg, style);
        this.textFieldFinalMsg.anchor.setTo(0.5);
    },
}

var GamePlayManager = {
    init: function(){
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.setGameSize(window.innerWidth, window.innerHeight);
        game.scale.forcePortrait=true;
        game.scale.refresh();

        

        this.flagDropBall=false;
        this.flagEndGame=false;
        this.isIpad=false;
        this.isPixel2XL=false;
    },
    preload: function(){
        //Fondo
        game.load.image('fondoLimpio','assets/img/fondo/fondo_limpio.png');
        game.load.image('fondoDesktop','assets/img/fondo/fondoPC.png');
        
        //Plataformas sprites
        game.load.image('platLimpio0','assets/img/plataformas/platLimpio0.png');
        game.load.image('platLimpio1','assets/img/plataformas/platLimpio1.png');
        game.load.image('platLimpio2','assets/img/plataformas/platLimpio2.png');
        game.load.image('platLimpio3','assets/img/plataformas/platLimpio3.png');
        game.load.image('platLimpio4','assets/img/plataformas/platLimpio4.png');
        game.load.image('platLimpio5','assets/img/plataformas/platLimpio5.png');
        game.load.image('platBas1','assets/img/plataformas/platBas1.png');
        game.load.image('platBas2','assets/img/plataformas/platBas2.png');
        //Tronco
        game.load.image('tronco','assets/img/troncos/tronco2.png');
        game.load.image('tronco2','assets/img/troncos/tronco2.png');
        game.load.image('tronco3','assets/img/troncos/tronco2.png');
        //Basureros
        game.load.spritesheet('basureros','assets/img/basureros/basureros2.png',129,142);

        //Basuras spritesheet
        game.load.spritesheet('organicas','assets/img/basuras/organicas.png', 168, 168);
    },
    create: function(){
        /********************************Materiales del juego*******************************************/
        if (game.scale.isGameLandscape ) {
            game.state.start('gameplayDesktop');
        }
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = GRAVEDAD_Y;
        this.worldMaterial = game.physics.p2.createMaterial('worldMaterial');
        game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
        this.materialPlataforma = game.physics.p2.createMaterial('materialPlataforma');
        this.materialTronco = game.physics.p2.createMaterial('materialTronco');
        this.materialBasurero = game.physics.p2.createMaterial('materialBasurero');
        
        //Array de troncos
        this.troncos=[];
        //Array de plataformas
        this.plataformas=[];
        this.basureros=[];
        
        //Fondo 
        var fondo = game.add.sprite(0,0,'fondoLimpio');
        fondo.width = window.innerWidth;
        fondo.height = window.innerHeight;

        /*Comprobacion de formatos especificos**************************************************************************/
        if ((window.innerWidth>=700)&&(window.innerHeight>=1024)) {
            this.isIpad=true;
        }
        if ((window.innerWidth<=411)&&(window.innerHeight>=680)) {
            this.isPixel2XL=true;
        }
        


        /***********************************************************************************************************/
        



        //Bola
         this.tipoBola = 0/*Math.floor(Math.random() * 4)*/;
        var frameBola = Math.floor(Math.random() * 5);
        /*Size de la bola*/
        if (window.innerWidth<window.innerHeight) {
            this.sizeBola = (window.innerHeight*6)/100;
        }else{
            if (window.innerWidth>window.innerHeight) {
                this.sizeBola = (window.innerHeight*4)/100;
            }
        }
        
        switch(this.tipoBola){
            case 0:
                this.bola_basura=game.add.sprite(window.innerWidth-100,0,'organicas',frameBola);
                break;
            case 1:
                this.bola_basura=game.add.sprite(window.innerWidth-100,0,'organicas',frameBola);
                //this.bola_basura=game.add.sprite(301,0,'vidrio',frameBola);
                break;
            case 2:
                this.bola_basura=game.add.sprite(window.innerWidth-100,0,'organicas',frameBola);
                //this.bola_basura=game.add.sprite(301,0,'plastico',frameBola);
                break;
            case 3:
                this.bola_basura=game.add.sprite(window.innerWidth-100,0,'organicas',frameBola);
                //this.bola_basura=game.add.sprite(301,0,'papel',frameBola);
                break;
        }
        this.bola_basura.width = this.sizeBola;
        this.bola_basura.height = this.sizeBola;
        
        //Plataformas
        var platLimpio1 = game.add.sprite(window.innerWidth,(window.innerHeight*13)/100,'platLimpio1');
        platLimpio1.width = (window.innerWidth*25)/100;
        platLimpio1.height = (window.innerHeight*3)/100;
        platLimpio1.x=(window.innerWidth)-(platLimpio1.width/3.5);

        var platLimpio2 = game.add.sprite((window.innerWidth*44.5)/100,(window.innerHeight*18.8)/100,'platLimpio2');
        platLimpio2.width = (window.innerWidth*38)/100;
        platLimpio2.height = (window.innerHeight*3)/100;
        
        var platLimpio3 = game.add.sprite((window.innerWidth*45)/100,(window.innerHeight*45)/100,'platLimpio3');
        platLimpio3.width = (window.innerWidth*50)/100;
        platLimpio3.height = (window.innerHeight*3)/100;
        
        var platLimpio4 = game.add.sprite((window.innerWidth*42)/100,(window.innerHeight*70)/100,'platLimpio4');
        platLimpio4.width = (window.innerWidth*48)/100;
        platLimpio4.height = (window.innerHeight*3)/100;
        
        var platLimpio5 = game.add.sprite((window.innerWidth*42)/100,(window.innerHeight*88)/100,'platLimpio5');
        platLimpio5.width = (window.innerWidth*58)/100;
        platLimpio5.height = (window.innerHeight*3)/100;

        var platBas1= game.add.sprite(window.innerWidth,(window.innerHeight*37)/100,'platBas1');
        platBas1.width = (window.innerWidth*65)/100;
        platBas1.height = (window.innerHeight*3)/100;

        var platBas2= game.add.sprite((window.innerWidth*0)/100,(window.innerHeight*81)/100,'platBas2');
        platBas2.width = (window.innerWidth*40)/100;
        platBas2.height = (window.innerHeight*3)/100;

        this.plataformas[1] = platLimpio1;
        this.plataformas[2] = platLimpio2;
        this.plataformas[3] = platLimpio3;
        this.plataformas[4] = platLimpio4;
        this.plataformas[5] = platLimpio5;
        this.plataformas[6] = platBas1;
        this.plataformas[7] = platBas2;
        
        /*Controloles individuales de plataformas*/    
        for(var i=1; i<=cant_plat_1; i++){
            this.plataformas[i].anchor.setTo(0.5);
            game.physics.p2.enable(this.plataformas[i]);
            switch(i){
                case 1:
                        this.plataformas[i].body.angle=-25;
                break;
                case 2:
                        this.plataformas[i].body.angle=10;
                break;
                case 3:
                        if(!this.isIpad&&!this.isPixel2XL){
                            this.plataformas[i].body.angle=30;
                            
                        }
                        else{
                            if (this.isPixel2XL) {
                                    this.plataformas[i].body.y=(window.innerHeight*42)/100;
                                    this.plataformas[i].body.angle=28;
                                }
                            if (this.isIpad) {
                                    this.plataformas[i].body.angle=24;    
                                }
                               
                        }
                break;
                case 4:
                        if(!this.isIpad&&!this.isPixel2XL){
                            this.plataformas[i].body.angle=-10;
                            
                        }
                        else{
                            if (this.isPixel2XL) {
                                    this.plataformas[i].body.angle=-10;
                                }
                            if (this.isIpad) {
                                    this.plataformas[i].body.angle=-6;    
                                }
                               
                        }
                        
                break;
                case 5:
                        if(!this.isIpad&&!this.isPixel2XL){
                            this.plataformas[i].body.angle=-13;
                            
                        }
                        else{
                            if (this.isPixel2XL) {
                                    this.plataformas[i].body.angle=-13;
                                }
                            if (this.isIpad) {
                                    this.plataformas[i].body.angle=-9;    
                                }
                               
                        }
                break;
                case 6:

                break
                case 7:

                break;
                default:

            }
            this.plataformas[i].body.setMaterial(this.materialPlataforma);
            this.plataformas[i].body.motionState=2;
            this.plataformas[i].body.mass=0;
        }

        /****BASUREROS****************************************************************************************************/
        this.bolaCollisionGroup = game.physics.p2.createCollisionGroup();
        this.basureroCollisionGroup = game.physics.p2.createCollisionGroup();


         var basurero_0 = game.add.sprite((window.innerWidth*74)/100,(window.innerHeight*31)/100,'basureros');
            basurero_0.frame = 0;
            var basurero_1 = game.add.sprite((window.innerWidth*10)/100,(window.innerHeight*53)/100,'basureros');
            basurero_1.frame = 1;
            var basurero_2 = game.add.sprite((window.innerWidth*9)/100,(window.innerHeight*75)/100,'basureros');
            basurero_2.frame = 2;
            var basurero_3 = game.add.sprite((window.innerWidth*84)/100,(window.innerHeight*91)/100,'basureros');
            basurero_3.frame = 3;

            //Esto es para hacer match con las basura correspondiente
            this.basureros[0] = basurero_0;
            this.basureros[0].id = 0;
            this.basureros[1] = basurero_1; 
            this.basureros[1].id = 1;
            this.basureros[2] = basurero_2; 
            this.basureros[2].id = 2;
            this.basureros[3] = basurero_3;  
            this.basureros[3].id = 3;

            for (var i = 0; i < this.basureros.length; i++) {
                this.basureros[i].width=(window.innerWidth*17)/100;
                this.basureros[i].height=(window.innerHeight*10)/100;
                game.physics.p2.enable(this.basureros[i],true);
                this.basureros[i].body.motionState=2;
                this.basureros[i].body.mass=0;
                this.basureros[i].body.clearShapes();
                this.basureros[i].body.setMaterial(this.materialBasurero);

            }


        /*********Troncos*************************************************/
        

        /*Controloes individuales de cada tronco*/
        for (var i = 0; i < cant_tron_1; i++) {
            switch(i){
                case 0:
                    this.troncos[i]=game.add.sprite((window.innerWidth*72.5)/100,(window.innerHeight*18.6)/100,"tronco")
                    this.troncos[i].width = (window.innerWidth*18)/100;
                    this.troncos[i].height = (window.innerHeight*3.5)/100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle=-15;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);
                break;
                case 1:
                    this.troncos[i]=game.add.sprite((window.innerWidth*14.5)/100,(window.innerHeight*34)/100,"tronco2")
                    this.troncos[i].width = (window.innerWidth*26)/100;
                    this.troncos[i].height = (window.innerHeight*3.5)/100;
                    game.physics.p2.enable(this.troncos[i]);
                    this.troncos[i].body.angle=34;
                break;
                case 2:
                    this.troncos[i]=game.add.sprite((window.innerWidth*80)/100,(window.innerHeight*65)/100,"tronco")
                    this.troncos[i].width = (window.innerWidth*30)/100;
                    this.troncos[i].height = (window.innerHeight*3)/100;
                    game.physics.p2.enable(this.troncos[i]);
                    if(this.isPixel2XL){
                        this.troncos[i].body.y=(window.innerHeight*66)/100;
                    }
                    this.troncos[i].body.angle=-15;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);
                break;
                case 3:
                    this.troncos[i]=game.add.sprite((window.innerWidth*83)/100,(window.innerHeight*82)/100,"tronco") 
                    this.troncos[i].width = (window.innerWidth*30)/100;
                    this.troncos[i].height = (window.innerHeight*3)/100;
                    game.physics.p2.enable(this.troncos[i]);
                    if(this.isPixel2XL){
                        this.troncos[i].body.y=(window.innerHeight*83)/100;
                    }
                    this.troncos[i].body.angle=-15;
                    this.troncos[i].body.clearShapes();
                    this.troncos[i].body.addRectangle((this.troncos[i].width*96)/100,(this.troncos[i].height*75)/100);
                break;

                default:
                break;
            }
            this.troncos[i].body.setMaterial(this.materialPlataforma);
            this.troncos[i].name = i;
            this.troncos[i].inputEnabled = true;
            this.troncos[i].body.motionState=2;
            this.troncos[i].body.mass=0;
            this.troncos[i].activado = false;
            this.troncos[i].events.onInputDown.add(this.tocandoTronco,this);
        }
        var plataformaMundo = game.physics.p2.createContactMaterial(this.materialPlataforma, this.worldMaterial, { friction: 0 });
        game.input.onDown.add(this.onTap, this);
    },
    update: function(){
        if(this.flagEndGame){
		}
		else{
            if(this.flagDropBall){
                for (var i = 0; i < AMOUNT_BASUREROS; i++) {
                   var rectBola=this.getBounds(this.bola_basura);
                   var rectBas=this.getBounds(this.basureros[i]);

                   if (this.isRectanglesOverlapping(rectBola,rectBas)) {
                       if(this.tipoBola==this.basureros[i].id){
                          //this.showFinalMessage('Basurero correcto');
                            flagResultEndGame=true;
                            this.state.start('final');
                        }
                       else{
                           //this.showFinalMessage('Basurero incorrecto');
                           flagResultEndGame=false
                           this.state.start('final');
                       }
                      flagEndGame=true;
                   }
                }

                if (this.bola_basura.body.velocity.x>0) {
                    this.bola_basura.body.rotation+=0.1;
                }
                if (this.bola_basura.body.velocity.x<0) {
                   this.bola_basura.body.rotation-=0.1; 
                }
                
            }else{
                var pointerX=game.input.x;
                var distX=pointerX - this.bola_basura.x;
                this.bola_basura.x += distX * 0.02;
            }
	    }
    },
    tocandoTronco: function(tronco){
         if(pantalla==1){
                    //tronco.body.moves = false;
                    if(!tronco.activado){
                        this.troncos[tronco.name].activado = true;
                        switch(tronco.name){
                            case 0: 
                                    this.troncos[tronco.name].body.angle=90;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*82.5)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*21)/100;
                            break;
                            case 1: 
                                    this.troncos[tronco.name].body.angle=90;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*25)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*30)/100;
                            break;
                            case 2: 
                                    this.troncos[tronco.name].body.angle=98;
                                    this.troncos[tronco.name].width= (window.innerWidth*24)/100;
                                    this.troncos[tronco.name].height= (window.innerHeight*3.5)/100;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*67)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*61)/100;
                                    this.troncos[tronco.name].body.clearShapes();
                                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                                    if (this.isPixel2XL) {
                                        this.troncos[tronco.name].body.y+=(window.innerHeight*3)/100;
                                    }
                            break;
                            case 3: 
                                    this.troncos[tronco.name].body.angle=90;
                                    this.troncos[tronco.name].width= (window.innerWidth*24)/100;
                                    this.troncos[tronco.name].height= (window.innerHeight*3.5)/100;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*71)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*78)/100;
                                    this.troncos[tronco.name].body.clearShapes();
                                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                                    if (this.isPixel2XL) {
                                        this.troncos[tronco.name].body.y=(window.innerHeight*81)/100;
                                    }
                            break;
                            default:
                        }
                        tronco.activado = true;
                    }else{
                        this.troncos[tronco.name].activado = false;
                        switch(tronco.name){
                            case 0: 
                                    this.troncos[tronco.name].body.angle=-15;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*72.5)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*18.6)/100;
                            break;
                            case 1: 
                                    this.troncos[tronco.name].body.angle=34;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*14.5)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*34)/100;
                            break;
                            case 2: 
                                    this.troncos[tronco.name].body.angle=-15;
                                    this.troncos[tronco.name].width = (window.innerWidth*30)/100;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*80)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*65)/100;
                                    this.troncos[tronco.name].body.clearShapes();
                                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                                    if (this.isPixel2XL) {
                                        this.troncos[tronco.name].body.y=(window.innerHeight*66)/100;
                                    }
                            break;
                            case 3: 
                                    this.troncos[tronco.name].body.angle=-15;
                                    this.troncos[tronco.name].width = (window.innerWidth*30)/100;
                                    this.troncos[tronco.name].body.x=(window.innerWidth*83)/100;
                                    this.troncos[tronco.name].body.y=(window.innerHeight*82)/100;
                                    this.troncos[tronco.name].body.clearShapes();
                                    this.troncos[tronco.name].body.addRectangle((this.troncos[tronco.name].width*96)/100,(this.troncos[tronco.name].height*75)/100);
                                    if (this.isPixel2XL) {
                                        this.troncos[tronco.name].body.y=(window.innerHeight*83)/100;
                                    }
                            break;
                            default:
                        }
                        tronco.activado = false;
                    }    
        }
    },
    getBounds:function(currentPlataform){
        return new Phaser.Rectangle(currentPlataform.left, currentPlataform.top, currentPlataform.width, currentPlataform.height);
    },
    isRectanglesOverlapping: function(rect1, rect2) {
        if(rect1.x> rect2.x+rect2.width || rect2.x> rect1.x+rect1.width){
            return false;
        }
        if(rect1.y> rect2.y+rect2.height || rect2.y> rect1.y+rect1.height){
            return false;
        }
        return true;
    },
    render:function(){

    },
    onTap: function(){
        this.flagDropBall=true;
        game.physics.p2.enable(this.bola_basura);
        this.bola_basura.body.setCircle(this.sizeBola/2);
        this.materialBola = game.physics.p2.createMaterial('materialBola');
        this.bola_basura.body.setMaterial(this.materialBola);
        this.bola_basura.allowRotation=true;
        var plataformaBola = game.physics.p2.createContactMaterial(this.materialBola, this.materialPlataforma, { friction: -3 });
        var troncoBola=game.physics.p2.createContactMaterial(this.materialBola, this.materialTronco, { friction:1});
    },
    showFinalMessage: function(msg){
        var bgAlpha = game.add.bitmapData(window.innerWidth, window.innerHeight);
        bgAlpha.ctx.fillStyle = '#FFFFFF';
        bgAlpha.ctx.fillRect(0,0,window.innerWidth, window.innerHeight);
        
        var bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;
        
        var style = {
            font: 'bold 12pt Arial',
            fill: '#FFFFFF',
            align: 'center'
          }
        
        this.textFieldFinalMsg = game.add.text(game.width/2, game.height/2, msg, style);
        this.textFieldFinalMsg.anchor.setTo(0.5);
    },
}

var estadoPrincipal={
	init: function(){
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;  
	},
	preload:function(){
        game.load.image('fondoLimpio','assets/img/fondo/fondo_limpio.png');
        game.load.image('boton_jugar','assets/img/Pantallas/boton_jugar.png');
        game.load.image('boton_salir','assets/img/Pantallas/boton_salir.png');
	},
	create:function(){
        var fondo = game.add.sprite(0,0,'fondoLimpio');
        fondo.width = window.innerWidth;
        fondo.height = window.innerHeight;
		var boton = this.add.button(window.innerWidth/2, (window.innerHeight/2)-50, 'boton_jugar', this.iniciarJuego, this);
        boton.anchor.setTo(0.5);
        var botonSalir = this.add.button(window.innerWidth/2, (window.innerHeight/2)+50, 'boton_salir',null, this);
        botonSalir.anchor.setTo(0.5);
	},
	iniciarJuego: function(){
        this.state.start('gameplay');
    },
}

var estadoFinal={
    init: function(){
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;  
    },
    preload:function(){
        game.load.image('fondoLimpio','assets/img/fondo/fondo_limpio.png');
        game.load.image('boton_reinicar','assets/img/Pantallas/boton_reinicar.png');
    },
    create:function(){
        var fondo = game.add.sprite(0,0,'fondoLimpio');
        fondo.width = window.innerWidth;
        fondo.height = window.innerHeight;
        if(flagResultEndGame){
            var text=game.add.text(window.innerWidth/2,(window.innerHeight/2)-100,'Has Ganado');
        }
        else{
            var text=game.add.text(window.innerWidth/2,(window.innerHeight/2)-100,'Has Perdido');
        }
        text.anchor.setTo(0.5);
        var boton = this.add.button(window.innerWidth/2,(window.innerHeight/2)+150, 'boton_reinicar', this.iniciarJuego, this);
        boton.anchor.setTo(0.5);
    },
    iniciarJuego: function(){
        this.state.start('inicio');
    },
}

var game = new Phaser.Game("100%", "100%", Phaser.CANVAS);

game.state.add('gameplayDesktop', GamePlayManagerDesktop);
game.state.add('gameplay', GamePlayManager);
game.state.add('inicio', estadoPrincipal);
game.state.add('final', estadoFinal);

game.state.start('gameplay');

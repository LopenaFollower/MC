import * as svr from "@minecraft/server";
/*docs: https://jaylydev.github.io/scriptapi-docs/1.19.70/modules/_minecraft_server_1_1_0_beta.html*/
const{world,system,MinecraftBlockTypes}=svr;
const blocks={
	base:MinecraftBlockTypes.smoothStone,
	wall:MinecraftBlockTypes.leaves,
	setup:MinecraftBlockTypes.redConcrete,
	semi:MinecraftBlockTypes.orangeConcrete,
	final:MinecraftBlockTypes.lightBlueConcrete,
	air:MinecraftBlockTypes.air
}
const{round,floor,ceil,random}=Math;
function setTimeout(callback,delay=0){return system.runTimeout(callback,delay*20/1000)};
function setInterval(callback,delay=0){return system.runInterval(callback,delay*20/1000)};
function clearRun(run){system.clearRun(run)};
function blockAt(x,y,z,dimension=world.getDimension("overworld")){
	return dimension.getBlock({
		x:floor(x),
		y:floor(y),
		z:floor(z)
	}).type;
}
function setblock(x,y,z,block){
	const dimension=world.getDimension("overworld");
	dimension.fillBlocks({x:x,y:y,z:z},{x:x,y:y,z:z},block);
}
function fill(fx,fy,fz,tx,ty,tz,block){
	const dimension=world.getDimension("overworld");
	dimension.fillBlocks({x:fx,y:fy,z:fz},{x:tx,y:ty,z:tz},block);
}
world.beforeEvents.chatSend.subscribe(chat=>{
	const msg=chat.message;
	const sender=chat.sender;
	const cmd=msg.split(" ")
	switch(cmd[0]){
		case"maze":
			//prevent broadcasting the message
			chat.cancel=true;
			if(cmd.length<2){
				return sender.sendMessage("[MG]: provide args")
			}
			//get args
			let size=round(parseInt(cmd[1]));
			const height=cmd.length==3?parseInt(cmd[2])-1:1;
			if(size%2===0)size++;
			//creates the dummy
			const dummy={
				location:{
					x:sender.location.x,
					y:sender.location.y,
					z:sender.location.z
				},
				dimension:sender.dimension,
				teleport:function(loc){
					this.location.x=loc.x
					this.location.y=loc.y
					this.location.z=loc.z
				}
			}
			//defines its coordinates
			let x=floor(dummy.location.x),
				y=floor(dummy.location.y),
				z=floor(dummy.location.z);
			const points={
				starting:{x:x,y:y,z:z+1.5},
				ending:{x:x+size-2,y:y,z:z+size-1}
			}
			//sets the platform
			setTimeout(()=>{
				fill(x,y-1,z,x+size-1,y-1,z+size-1,blocks.base);
				for(let cy=y;cy<=y+height;cy++){
					fill(x,cy,z,x+size-1,cy,z+size-1,blocks.air);
				}
				//positions the dummy
				dummy.teleport({
					x:x-.5,
					y:y,
					z:z+1.5
				});
				const loop1=setInterval(()=>{
					//redefines coordinates
					let x=floor(dummy.location.x)+.5;
					let y=floor(dummy.location.y);
					let z=floor(dummy.location.z)+.5;
					let methods=[false,false,false,false];
					//setting up cells
					if(blockAt(x+1,y-1,z-1)==blocks.base&&blockAt(x+2,y-1,z-1)==blocks.base&&blockAt(x+1,y-1,z)==blocks.base&&blockAt(x+2,y-1,z)==blocks.base&&blockAt(x+1,y-1,z+1)==blocks.base&&blockAt(x+2,y-1,z+1)==blocks.base&&blockAt(x,y-1,y-2)!==blocks.base){
						dummy.teleport({
							x:x+2,
							y:y,
							z:z
						});
						setTimeout(()=>{
							if(blockAt(x,y-1,z)==blocks.base&&blockAt(x-1,y-1,z)==blocks.base&&blockAt(x+1,y-1,z)==blocks.base&&blockAt(x,y-1,z+1)==blocks.base&&blockAt(x,y-1,z-1)==blocks.base&&blockAt(x+1,y-1,z+1)==blocks.base&&blockAt(x+1,y-1,z-1)==blocks.base&&blockAt(x-1,y-1,z+1)==blocks.base&&blockAt(x-1,y-1,z-1)==blocks.base){
								setblock(x,y-1,z,blocks.setup)
							}
						},5);
						methods[0]=false;
					}else methods[0]=true;
					if(blockAt(x-1,y-1,z+1)==blocks.base&&blockAt(x-1,y-1,z+2)==blocks.base&&blockAt(x,y-1,z+1)==blocks.base&&blockAt(x,y-1,z+2)==blocks.base&&blockAt(x+1,y-1,z+1)==blocks.base&&blockAt(x+1,y-1,z+2)==blocks.base&&blockAt(x+2,y-1,z)!==blocks.base){
						dummy.teleport({
							x:x,
							y:y,
							z:z+2
						});
						setTimeout(()=>{
							if(blockAt(x,y-1,z)==blocks.base&&blockAt(x-1,y-1,z)==blocks.base&&blockAt(x+1,y-1,z)==blocks.base&&blockAt(x,y-1,z+1)==blocks.base&&blockAt(x,y-1,z-1)==blocks.base&&blockAt(x+1,y-1,z+1)==blocks.base&&blockAt(x+1,y-1,z-1)==blocks.base&&blockAt(x-1,y-1,z+1)==blocks.base&&blockAt(x-1,y-1,z-1)==blocks.base){
								setblock(x,y-1,z,blocks.setup)
							}
						},5);
						methods[1]=false;
					}else methods[1]=true;
					if(blockAt(x-1,y-1,z-1)==blocks.base&&blockAt(x-2,y-1,z-1)==blocks.base&&blockAt(x-1,y-1,z)==blocks.base&&blockAt(x-2,y-1,z)==blocks.base&&blockAt(x-1,y-1,z+1)==blocks.base&&blockAt(x-2,y-1,z+1)==blocks.base&&blockAt(x,y-1,z+2)!==blocks.base){
						dummy.teleport({
							x:x-2,
							y:y,
							z:z
						});
						setTimeout(()=>{
							if(blockAt(x,y-1,z)==blocks.base&&blockAt(x-1,y-1,z)==blocks.base&&blockAt(x+1,y-1,z)==blocks.base&&blockAt(x,y-1,z+1)==blocks.base&&blockAt(x,y-1,z-1)==blocks.base&&blockAt(x+1,y-1,z+1)==blocks.base&&blockAt(x+1,y-1,z-1)==blocks.base&&blockAt(x-1,y-1,z+1)==blocks.base&&blockAt(x-1,y-1,z-1)==blocks.base){
								setblock(x,y-1,z,blocks.setup)
							}
						},5);
						methods[2]=false;
					}else methods[2]=true;
					if(blockAt(x-1,y-1,z-1)==blocks.base&&blockAt(x-1,y-1,z-2)==blocks.base&&blockAt(x,y-1,z-1)==blocks.base&&blockAt(x,y-1,z-2)==blocks.base&&blockAt(x+1,y-1,z-1)==blocks.base&&blockAt(x+1,y-1,z-2)==blocks.base&&blockAt(x-2,y-1,z)!==blocks.base){
						dummy.teleport({
							x:x,
							y:y,
							z:z-2
						});
						setTimeout(()=>{
							if(blockAt(x,y-1,z)==blocks.base&&blockAt(x-1,y-1,z)==blocks.base&&blockAt(x+1,y-1,z)==blocks.base&&blockAt(x,y-1,z+1)==blocks.base&&blockAt(x,y-1,z-1)==blocks.base&&blockAt(x+1,y-1,z+1)==blocks.base&&blockAt(x+1,y-1,z-1)==blocks.base&&blockAt(x-1,y-1,z+1)==blocks.base&&blockAt(x-1,y-1,z-1)==blocks.base){
								setblock(x,y-1,z,blocks.setup)
							}
						},5);
						methods[3]=false;
					}else methods[3]=true;
					//checked if done setting up
					sender.teleport({
						x:x,
						y:y,
						z:z
					},sender.dimension);
					if(methods.indexOf(false)<0){
						clearRun(loop1)
						setblock(x,y-1,z,blocks.setup);
						dummy.teleport({
							x:points.starting.x+1,
							y:points.starting.y,
							z:points.starting.z
						});
						//creates a route
						let route=[
							[
								dummy.location.x,
								dummy.location.z
							]
						];
						//declares directions
						const dirs=[
							[2,0],
							[-2,0],
							[0,2],
							[0,-2]
						];
						const loop2=setInterval(()=>{
							//redefining
							let x=floor(dummy.location.x)+.5,
								y=floor(dummy.location.y),
								z=floor(dummy.location.z)+.5,
								possibleDirs=[];
							//iterates the directions
							for(let i=0;i<dirs.length;i++){
								if(blockAt(x+dirs[i][0],y-1,z+dirs[i][1])==blocks.setup){
									//if block isnt visited, considered as a possible direction
									possibleDirs.push(dirs[i]);
								}
							}
							//check if there is possible directions
							if(possibleDirs.length>0){
								//if there is, then we choose at random 1 direction
								let chosen=possibleDirs[random()*possibleDirs.length|0];
								//add it to the route
								route.push([x+chosen[0],z+chosen[1]])
								//tracing
								fill(floor(x),y-1,floor(z),floor(x)+chosen[0],y-1,floor(z)+chosen[1],blocks.semi);
								//move to the chosen cell
								dummy.teleport({
									x:x+chosen[0],
									y:y,
									z:z+chosen[1]
								});
							}else{
								//if no possible directions then we go back the route
								route.pop();
								//check if we can still go back
								if(route.length>0){
									//if so, we set as visited
									fill(x,y-1,z,route[route.length-1][0],y-1,route[route.length-1][1],blocks.final);
									if(blockAt(x+1,y-1,z)==blocks.base){
										fill(x+1,y,z,x+1,y+height,z,blocks.wall);
									}
									if(blockAt(x-1,y-1,z)==blocks.base){
										fill(x-1,y,z,x-1,y+height,z,blocks.wall);
									}
									if(blockAt(x,y-1,z+1)==blocks.base){
										fill(x,y,z+1,x,y+height,z+1,blocks.wall);
									}
									if(blockAt(x,y-1,z-1)==blocks.base){
										fill(x,y,z-1,x,y+height,z-1,blocks.wall);
									}
									if(blockAt(x+1,y-1,z+1)==blocks.base){
										fill(x+1,y,z+1,x+1,y+height,z+1,blocks.wall);
									}
									if(blockAt(x-1,y-1,z+1)==blocks.base){
										fill(x-1,y,z+1,x-1,y+height,z+1,blocks.wall);
									}
									if(blockAt(x+1,y-1,z-1)==blocks.base){
										fill(x+1,y,z-1,x+1,y+height,z-1,blocks.wall);
									}
									if(blockAt(x-1,y-1,z-1)==blocks.base){
										fill(x-1,y,z-1,x-1,y+height,z-1,blocks.wall);
									}
									fill(x,y,z,x,y+height+2,z,blocks.air);
									//go back to that route
									dummy.teleport({
										x:route[route.length-1][0],
										y:y,
										z:route[route.length-1][1]
									});
								}else{
									//if no more routes then were done
									clearRun(loop2);
									setblock(x,y-1,z,blocks.final);
									sender.sendMessage("[MG]: finished");
									fill(points.starting.x,points.starting.y,points.starting.z,points.starting.x,points.starting.y+height,points.starting.z,blocks.air);
									fill(points.ending.x,points.ending.y,points.ending.z,points.ending.x,points.ending.y+height,points.ending.z,blocks.air);
								}
							}
						},25)
					}
				},25);
			},250);
			break;
	}
});
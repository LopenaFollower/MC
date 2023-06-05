import * as svr from "@minecraft/server";
/*docs: https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/minecraft-server*/
const{world,system,MinecraftBlockTypes}=svr;
const blocks={
	wall:MinecraftBlockTypes.smoothStone,
	setup:MinecraftBlockTypes.netherrack,
	semi:MinecraftBlockTypes.quartzBlock,
	final:MinecraftBlockTypes.planks
}
const{round,floor,ceil,random}=Math;
function setTimeout(callback,delay){return system.runTimeout(callback,delay*20/1000)};
function setInterval(callback,delay){return system.runInterval(callback,delay*20/1000)};
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
world.events.beforeChat.subscribe(chat=>{
	let msg=chat.message;
	let sender=chat.sender;
	const cmd=msg.split(" ")
	switch(cmd[0]){
		case"maze":
			//mutes chat
			chat.cancel=true;
			//get arg
			const size=parseInt(cmd[1])
			if(size%2===0)return console.warn("must be odd number");
			//creates the dummy
			const dummy=sender.dimension.spawnEntity("minecraft:armor_stand",sender.location);
			//defines its coordinates
			let x=floor(dummy.location.x),
				y=floor(dummy.location.y),
				z=floor(dummy.location.z);
			//sets the platform
			dummy.dimension.fillBlocks({
				x:x,
				y:y-1,
				z:z
			},{
				x:x+size-1,
				y:y-1,
				z:z+size-1
			},blocks.wall);
			//positions the dummy
			dummy.teleport({
				x:x-.5,
				y:y,
				z:z+1.5
			},dummy.dimension,0,0,false);
			let loop1=setInterval(()=>{
				//redefines coordinates
				let x=floor(dummy.location.x)+.5;
				let y=floor(dummy.location.y);
				let z=floor(dummy.location.z)+.5;
				let methods=[false,false,false,false];
				//setting up cells
				if(blockAt(x+1,y-1,z-1)==blocks.wall&&blockAt(x+2,y-1,z-1)==blocks.wall&&blockAt(x+1,y-1,z)==blocks.wall&&blockAt(x+2,y-1,z)==blocks.wall&&blockAt(x+1,y-1,z+1)==blocks.wall&&blockAt(x+2,y-1,z+1)==blocks.wall&&blockAt(x,y-1,y-2)!==blocks.wall){
					dummy.teleport({
						x:x+2,
						y:y,
						z:z
					},dummy.dimension,0,0,false);
					setTimeout(()=>{
						if(blockAt(x,y-1,z)==blocks.wall&&blockAt(x-1,y-1,z)==blocks.wall&&blockAt(x+1,y-1,z)==blocks.wall&&blockAt(x,y-1,z+1)==blocks.wall&&blockAt(x,y-1,z-1)==blocks.wall&&blockAt(x+1,y-1,z+1)==blocks.wall&&blockAt(x+1,y-1,z-1)==blocks.wall&&blockAt(x-1,y-1,z+1)==blocks.wall&&blockAt(x-1,y-1,z-1)==blocks.wall){
							setblock(x,y-1,z,blocks.setup)
						}
					},25);
					methods[0]=false;
				}else methods[0]=true;
				if(blockAt(x-1,y-1,z+1)==blocks.wall&&blockAt(x-1,y-1,z+2)==blocks.wall&&blockAt(x,y-1,z+1)==blocks.wall&&blockAt(x,y-1,z+2)==blocks.wall&&blockAt(x+1,y-1,z+1)==blocks.wall&&blockAt(x+1,y-1,z+2)==blocks.wall&&blockAt(x+2,y-1,z)!==blocks.wall){
					dummy.teleport({
						x:x,
						y:y,
						z:z+2
					},dummy.dimension,0,0,false);
					setTimeout(()=>{
						if(blockAt(x,y-1,z)==blocks.wall&&blockAt(x-1,y-1,z)==blocks.wall&&blockAt(x+1,y-1,z)==blocks.wall&&blockAt(x,y-1,z+1)==blocks.wall&&blockAt(x,y-1,z-1)==blocks.wall&&blockAt(x+1,y-1,z+1)==blocks.wall&&blockAt(x+1,y-1,z-1)==blocks.wall&&blockAt(x-1,y-1,z+1)==blocks.wall&&blockAt(x-1,y-1,z-1)==blocks.wall){
							setblock(x,y-1,z,blocks.setup)
						}
					},25);
					methods[1]=false;
				}else methods[1]=true;
				if(blockAt(x-1,y-1,z-1)==blocks.wall&&blockAt(x-2,y-1,z-1)==blocks.wall&&blockAt(x-1,y-1,z)==blocks.wall&&blockAt(x-2,y-1,z)==blocks.wall&&blockAt(x-1,y-1,z+1)==blocks.wall&&blockAt(x-2,y-1,z+1)==blocks.wall&&blockAt(x,y-1,z+2)!==blocks.wall){
					dummy.teleport({
						x:x-2,
						y:y,
						z:z
					},dummy.dimension,0,0,false);
					setTimeout(()=>{
						if(blockAt(x,y-1,z)==blocks.wall&&blockAt(x-1,y-1,z)==blocks.wall&&blockAt(x+1,y-1,z)==blocks.wall&&blockAt(x,y-1,z+1)==blocks.wall&&blockAt(x,y-1,z-1)==blocks.wall&&blockAt(x+1,y-1,z+1)==blocks.wall&&blockAt(x+1,y-1,z-1)==blocks.wall&&blockAt(x-1,y-1,z+1)==blocks.wall&&blockAt(x-1,y-1,z-1)==blocks.wall){
							setblock(x,y-1,z,blocks.setup)
						}
					},25);
					methods[2]=false;
				}else methods[2]=true;
				if(blockAt(x-1,y-1,z-1)==blocks.wall&&blockAt(x-1,y-1,z-2)==blocks.wall&&blockAt(x,y-1,z-1)==blocks.wall&&blockAt(x,y-1,z-2)==blocks.wall&&blockAt(x+1,y-1,z-1)==blocks.wall&&blockAt(x+1,y-1,z-2)==blocks.wall&&blockAt(x-2,y-1,z)!==blocks.wall){
					dummy.teleport({
						x:x,
						y:y,
						z:z-2
					},dummy.dimension,0,0,false);
					setTimeout(()=>{
						if(blockAt(x,y-1,z)==blocks.wall&&blockAt(x-1,y-1,z)==blocks.wall&&blockAt(x+1,y-1,z)==blocks.wall&&blockAt(x,y-1,z+1)==blocks.wall&&blockAt(x,y-1,z-1)==blocks.wall&&blockAt(x+1,y-1,z+1)==blocks.wall&&blockAt(x+1,y-1,z-1)==blocks.wall&&blockAt(x-1,y-1,z+1)==blocks.wall&&blockAt(x-1,y-1,z-1)==blocks.wall){
							setblock(x,y-1,z,blocks.setup)
						}
					},25);
					methods[3]=false;
				}else methods[3]=true;
				//checked if done setting up
				if(methods.indexOf(false)<0){
					clearRun(loop1)
					setblock(x,y-1,z,blocks.setup);
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
					let loop2=setInterval(()=>{
						//redefining
						let x=floor(dummy.location.x)+.5,
							y=floor(dummy.location.y),
							z=floor(dummy.location.z)+.5,
							possibleDirs=[];
						//iterates the directions
						for(let i=0;i<dirs.length;i++){
							if(blockAt(x+dirs[i][0],y-1,z+dirs[i][1],dummy.dimension)==blocks.setup){
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
							dummy.dimension.fillBlocks({
								x:floor(x),
								y:y-1,
								z:floor(z)
							},{
								x:floor(x)+chosen[0],
								y:y-1,
								z:floor(z)+chosen[1]
							},blocks.semi);
							//move to the chosen cell
							dummy.teleport({
								x:x+chosen[0],
								y:y,
								z:z+chosen[1]
							},dummy.dimension,0,0,false);
						}else{
							//if no possible directions then we go back the route
							route.pop();
							//check if we can still go back
							if(route.length>0){
								//if so, we set as visited
								dummy.dimension.fillBlocks({
									x:x,
									y:y-1,
									z:z
								},{
									x:route[route.length-1][0],
									y:y-1,
									z:route[route.length-1][1]
								},blocks.final);
								//go back to that route
								dummy.teleport({
									x:route[route.length-1][0],
									y:y,
									z:route[route.length-1][1]
								},dummy.dimension,0,0,false);
							}else{
								//if no more routes then were done
								clearRun(loop2);
								dummy.dimension.fillBlocks({
									x:x,
									y:y-1,
									z:z
								},{
									x:x,
									y:y-1,
									z:z
								},blocks.final);
								dummy.runCommandAsync("say done");
								dummy.runCommandAsync("kill @s")
							}
						}
					},75)
				}
			},75);
			break;
	}
});
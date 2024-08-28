import { envs } from "./config/adapters/envs.adapter"
import { Server } from "./presentation/server"

(async() => {
	main()	
})()

function main(){
	Server.start();
	// console.log(envs.PORT)
}

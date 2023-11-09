import FreeCodeCamp from "./Models/FreeCodeCamp";

const freeCodeCamp = new FreeCodeCamp();

const start = async () =>{
  console.log(await freeCodeCamp.mountMarkdownData());
}


start();

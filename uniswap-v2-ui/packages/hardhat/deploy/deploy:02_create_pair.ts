import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const createPair: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments } = hre;
  const { deployer } = await getNamedAccounts();
  const { get } = deployments;

  const factory = await ethers.getContractAt("UniswapV2Factory", (await get("UniswapV2Factory")).address);
  const tokenA = (await get("TokenA")).address;
  const tokenB = (await get("TokenB")).address;

  
  const existingPair = await factory.getPair(tokenA, tokenB);
  if (existingPair !== ethers.ZeroAddress) {
    console.log("Pair already exists at:", existingPair);
    return;
  }

  const tx = await factory.createPair(tokenA, tokenB);
  const receipt = await tx.wait();
  const pairAddress = await factory.getPair(tokenA, tokenB);

  console.log("Pair created at address:", pairAddress);
};

export default createPair;
createPair.tags = ["CreatePair"];

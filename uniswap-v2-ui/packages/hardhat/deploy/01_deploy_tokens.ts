import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { parseEther } from "ethers"; 

const deployTokens: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("TokenA", {
    contract: "AAAUniswapV2ERC20",
    from: deployer,
    args: ["TokenA", "TKA", 18, parseEther("1000000")],
    log: true,
  });

  await deploy("TokenB", {
    contract: "AAAUniswapV2ERC20",
    from: deployer,
    args: ["TokenB", "TKB", 18, parseEther("1000000")],
    log: true,
  });
};

export default deployTokens;
deployTokens.tags = ["TokenA", "TokenB"];

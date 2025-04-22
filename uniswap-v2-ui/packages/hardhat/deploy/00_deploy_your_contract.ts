import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys UniswapV2Factory contract using deployer as feeSetter
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployUniswapV2Factory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("UniswapV2Factory", {
    from: deployer,
    args: [deployer], // feeSetter addresss
    log: true,
    autoMine: true,
  });

  const factory = await hre.ethers.getContract<Contract>("UniswapV2Factory", deployer);
  console.log("✅ UniswapV2Factory deployed at:", factory.target);
  console.log("👤 Fee setter is:", await factory.feeToSetter());
};

export default deployUniswapV2Factory;

deployUniswapV2Factory.tags = ["UniswapV2Factory"];

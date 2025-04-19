// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/uniswap/UniswapV2Factory.sol";

contract UniswapV2FactoryTest is Test {
    UniswapV2Factory factory;

    address feeSetter = address(0x123);
    address tokenA = address(0xABC1);
    address tokenB = address(0xABC2);

    function setUp() public {
        factory = new UniswapV2Factory(feeSetter);
    }

    function testInitialFeeToSetter() public view {
        assertEq(factory.feeToSetter(), feeSetter);
    }

    function testSetFeeTo() public {
        vm.prank(feeSetter);
        factory.setFeeTo(address(0x999));
        assertEq(factory.feeTo(), address(0x999));
    }

    function testSetFeeToSetter() public {
        vm.prank(feeSetter);
        factory.setFeeToSetter(address(0x888));
        assertEq(factory.feeToSetter(), address(0x888));
    }

    function testCreatePair() public {
        address pair = factory.createPair(tokenA, tokenB);
        assertTrue(pair != address(0));
        assertEq(factory.getPair(tokenA, tokenB), pair);
        assertEq(factory.getPair(tokenB, tokenA), pair);
        assertEq(factory.allPairsLength(), 1);
    }

    function testRevertOnIdenticalAddresses() public {
        vm.expectRevert("UniswapV2: IDENTICAL_ADDRESSES");
        factory.createPair(tokenA, tokenA);
    }

    function testRevertOnZeroAddress() public {
        vm.expectRevert("UniswapV2: ZERO_ADDRESS");
        factory.createPair(address(0), tokenA);
    }

    function testRevertOnDuplicatePair() public {
        factory.createPair(tokenA, tokenB);
        vm.expectRevert("UniswapV2: PAIR_EXISTS");
        factory.createPair(tokenB, tokenA);
    }
}

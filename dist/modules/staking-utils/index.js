define("@staking/staking-utils", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@scom/oswap-time-is-money-contract", "@scom/oswap-openswap-contract", "@openswap/chainlink-sdk", "@openswap/cross-chain-bridge-sdk", "@staking/global", "@staking/store"], function (require, exports, components_1, eth_wallet_1, oswap_time_is_money_contract_1, oswap_openswap_contract_1, chainlink_sdk_1, cross_chain_bridge_sdk_1, global_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deployCampaign = exports.getApprovalModelAction = exports.lockToken = exports.claimToken = exports.withdrawToken = exports.getVaultRewardCurrentAPR = exports.getLPRewardCurrentAPR = exports.getERC20RewardCurrentAPR = exports.getVaultBalance = exports.getVaultObject = exports.getLPBalance = exports.getLPObject = exports.getStakingTotalLocked = exports.getAllCampaignsInfo = exports.getTokenPrice = void 0;
    const getTokenPrice = async (token) => {
        let wallet = eth_wallet_1.Wallet.getInstance();
        let chainId = wallet.chainId;
        let tokenPrice;
        // get price from price feed 
        let tokenPriceFeedAddress = store_1.ToUSDPriceFeedAddressesMap[chainId][token.toLowerCase()];
        if (tokenPriceFeedAddress) {
            let aggregator = new chainlink_sdk_1.Contracts.EACAggregatorProxy(wallet, tokenPriceFeedAddress);
            let tokenLatestRoundData = await aggregator.latestRoundData();
            let tokenPriceFeedDecimals = await aggregator.decimals();
            return tokenLatestRoundData.answer.shiftedBy(-tokenPriceFeedDecimals).toFixed();
        }
        // get price from AMM
        let referencePair = store_1.tokenPriceAMMReference[chainId][token.toLowerCase()];
        if (!referencePair)
            return null;
        let pair = new oswap_openswap_contract_1.Contracts.OSWAP_Pair(wallet, referencePair);
        let token0 = await pair.token0();
        let token1 = await pair.token1();
        let reserves = await pair.getReserves();
        let token0PriceFeedAddress = store_1.ToUSDPriceFeedAddressesMap[chainId][token0.toLowerCase()];
        let token1PriceFeedAddress = store_1.ToUSDPriceFeedAddressesMap[chainId][token1.toLowerCase()];
        if (token0PriceFeedAddress || token1PriceFeedAddress) {
            if (token0PriceFeedAddress) {
                let aggregator = new chainlink_sdk_1.Contracts.EACAggregatorProxy(wallet, token0PriceFeedAddress);
                let token0LatestRoundData = await aggregator.latestRoundData();
                let token0PriceFeedDecimals = await aggregator.decimals();
                let token0USDPrice = new eth_wallet_1.BigNumber(token0LatestRoundData.answer).shiftedBy(-token0PriceFeedDecimals).toFixed();
                if (new eth_wallet_1.BigNumber(token.toLowerCase()).lt(token0.toLowerCase())) {
                    tokenPrice = new eth_wallet_1.BigNumber(reserves._reserve1).div(reserves._reserve0).times(token0USDPrice).toFixed();
                }
                else {
                    tokenPrice = new eth_wallet_1.BigNumber(reserves._reserve0).div(reserves._reserve1).times(token0USDPrice).toFixed();
                }
            }
            else {
                let aggregator = new chainlink_sdk_1.Contracts.EACAggregatorProxy(wallet, token1PriceFeedAddress);
                let token1LatestRoundData = await aggregator.latestRoundData();
                let token1PriceFeedDecimals = await aggregator.decimals();
                let token1USDPrice = new eth_wallet_1.BigNumber(token1LatestRoundData.answer).shiftedBy(-token1PriceFeedDecimals).toFixed();
                if (new eth_wallet_1.BigNumber(token.toLowerCase()).lt(token1.toLowerCase())) {
                    tokenPrice = new eth_wallet_1.BigNumber(reserves._reserve1).div(reserves._reserve0).times(token1USDPrice).toFixed();
                }
                else {
                    tokenPrice = new eth_wallet_1.BigNumber(reserves._reserve0).div(reserves._reserve1).times(token1USDPrice).toFixed();
                }
            }
        }
        else {
            if (token0.toLowerCase() == token.toLowerCase()) { //for other reference pair
                let token1Price = await exports.getTokenPrice(token1);
                if (!token1Price)
                    return null;
                tokenPrice = new eth_wallet_1.BigNumber(token1Price).times(reserves._reserve1).div(reserves._reserve0).toFixed();
            }
            else {
                let token0Price = await exports.getTokenPrice(token0);
                if (!token0Price)
                    return null;
                tokenPrice = new eth_wallet_1.BigNumber(token0Price).times(reserves._reserve0).div(reserves._reserve1).toFixed();
            }
        }
        return tokenPrice;
    };
    exports.getTokenPrice = getTokenPrice;
    const getStakingRewardInfoByAddresses = async (option, providerAddress, releaseTime) => {
        try {
            let rewardAddress = option.address;
            let isCommonStartDate = option.isCommonStartDate;
            let reward = '0';
            let claimSoFar = '0';
            let claimable = '0';
            let admin = '';
            if (!rewardAddress) {
                return {
                    reward,
                    claimSoFar,
                    claimable,
                    multiplier: option.multiplier
                };
            }
            let wallet = eth_wallet_1.Wallet.getInstance();
            let rewardsContract;
            if (isCommonStartDate) {
                rewardsContract = new oswap_time_is_money_contract_1.Contracts.RewardsCommonStartDate(wallet, rewardAddress);
            }
            else {
                rewardsContract = new oswap_time_is_money_contract_1.Contracts.Rewards(wallet, rewardAddress);
            }
            try {
                admin = await rewardsContract.admin();
                let rewardWei = await rewardsContract.reward();
                let unclaimedWei = await rewardsContract.unclaimed();
                let claimSoFarWei = await rewardsContract.claimSoFar(providerAddress);
                reward = eth_wallet_1.Utils.fromDecimals(rewardWei).toFixed();
                claimSoFar = eth_wallet_1.Utils.fromDecimals(claimSoFarWei).toFixed();
                claimable = eth_wallet_1.Utils.fromDecimals(unclaimedWei).toFixed();
            }
            catch (err) {
            }
            let vestingPeriod = (await rewardsContract.vestingPeriod()).toNumber();
            let vestingStart;
            if (rewardsContract instanceof oswap_time_is_money_contract_1.Contracts.RewardsCommonStartDate) {
                let vestingStartDateRaw = (await rewardsContract.vestingStartDate()).toNumber();
                vestingStart = components_1.moment.unix(vestingStartDateRaw);
            }
            else {
                vestingStart = components_1.moment.unix(releaseTime);
            }
            let vestingEnd = components_1.moment(vestingStart).add(vestingPeriod, 'seconds');
            let multiplierWei = await rewardsContract.multiplier();
            let multiplier = eth_wallet_1.Utils.fromDecimals(multiplierWei).toFixed();
            return {
                vestingPeriod,
                vestingStart,
                vestingEnd,
                reward,
                claimSoFar,
                claimable,
                multiplier,
                admin
            };
        }
        catch (err) {
            console.log('err', err);
            return null;
        }
    };
    const getDefaultStakingByAddress = async (option) => {
        try {
            let wallet = eth_wallet_1.Wallet.getInstance();
            let stakingAddress = option.address;
            let rewards = option.rewards;
            let hasRewardAddress = rewards.length && rewards[0].address;
            let timeIsMoney = new oswap_time_is_money_contract_1.Contracts.TimeIsMoney(wallet, stakingAddress);
            let minimumLockTime = await timeIsMoney.minimumLockTime();
            let maximumTotalLock = await timeIsMoney.maximumTotalLock();
            let startOfEntryPeriod = '0';
            try {
                startOfEntryPeriod = (await timeIsMoney.startOfEntryPeriod()).toFixed();
            }
            catch (err) { }
            let tokenAddress = await timeIsMoney.token();
            let stakingDecimals = 18 - store_1.getTokenDecimals(tokenAddress.toLocaleLowerCase());
            let endOfEntryPeriod = (await timeIsMoney.endOfEntryPeriod()).toFixed();
            let perAddressCapWei = await timeIsMoney.perAddressCap();
            let maxTotalLock = eth_wallet_1.Utils.fromDecimals(maximumTotalLock).shiftedBy(stakingDecimals).toFixed();
            let perAddressCap = eth_wallet_1.Utils.fromDecimals(perAddressCapWei).shiftedBy(stakingDecimals).toFixed();
            let obj = {
                minLockTime: minimumLockTime.toNumber(),
                maxTotalLock,
                startOfEntryPeriod: parseInt(startOfEntryPeriod) * 1000,
                endOfEntryPeriod: parseInt(endOfEntryPeriod) * 1000,
                perAddressCap,
                lockTokenAddress: tokenAddress,
            };
            if (hasRewardAddress) {
                let rewardsData = [];
                let promises = rewards.map(async (reward, index) => {
                    return new Promise(async (resolve, reject) => {
                        let rewardsContract, admin, multiplier, initialReward, rewardTokenAddress, vestingPeriod, vestingStartDate, claimDeadline;
                        try {
                            if (reward.isCommonStartDate) {
                                rewardsContract = new oswap_time_is_money_contract_1.Contracts.RewardsCommonStartDate(wallet, reward.address);
                            }
                            else {
                                rewardsContract = new oswap_time_is_money_contract_1.Contracts.Rewards(wallet, reward.address);
                            }
                            admin = await rewardsContract.admin();
                            rewardTokenAddress = await rewardsContract.token();
                            let rewardToken = new eth_wallet_1.Erc20(wallet, rewardTokenAddress);
                            let rewardTokenDecimals = await rewardToken.decimals;
                            let multiplierWei = await rewardsContract.multiplier();
                            multiplier = eth_wallet_1.Utils.fromDecimals(multiplierWei, rewardTokenDecimals).toFixed();
                            initialReward = eth_wallet_1.Utils.fromDecimals(await rewardsContract.initialReward(), rewardTokenDecimals).toFixed();
                            vestingPeriod = (await rewardsContract.vestingPeriod()).toNumber();
                            claimDeadline = (await rewardsContract.claimDeadline()).toNumber();
                            if (reward.isCommonStartDate) {
                                vestingStartDate = (await rewardsContract.vestingStartDate()).toNumber();
                            }
                            let rewardAmount = new eth_wallet_1.BigNumber(multiplier).multipliedBy(maxTotalLock).toFixed();
                            rewardsData.push(Object.assign(Object.assign({}, reward), { rewardTokenAddress,
                                multiplier,
                                initialReward,
                                vestingPeriod,
                                admin,
                                vestingStartDate,
                                rewardAmount,
                                index }));
                        }
                        catch (_a) { }
                        resolve();
                    });
                });
                await Promise.all(promises);
                return Object.assign(Object.assign(Object.assign({}, option), obj), { rewards: rewardsData.sort((a, b) => a.index - b.index) });
            }
            else {
                return obj;
            }
        }
        catch (err) {
            console.log('err', err);
            return null;
        }
    };
    const getStakingOptionExtendedInfoByAddress = async (option) => {
        try {
            let wallet = eth_wallet_1.Wallet.getInstance();
            let chainId = wallet.chainId;
            let stakingAddress = option.address;
            let rewardOptions = option.rewards;
            let currentAddress = wallet.address;
            let hasRewardAddress = rewardOptions.length > 0 && rewardOptions[0].address;
            let timeIsMoney = new oswap_time_is_money_contract_1.Contracts.TimeIsMoney(wallet, stakingAddress);
            let totalCreditWei = await timeIsMoney.getCredit(currentAddress);
            let lockAmountWei = await timeIsMoney.lockAmount(currentAddress);
            let withdrawn = await timeIsMoney.withdrawn(currentAddress);
            let totalCredit = eth_wallet_1.Utils.fromDecimals(totalCreditWei).toFixed();
            let lockAmount = eth_wallet_1.Utils.fromDecimals(lockAmountWei).toFixed();
            let stakeQty = withdrawn ? '0' : lockAmount;
            let mode = '';
            if (new eth_wallet_1.BigNumber(totalCredit).gt(0) && hasRewardAddress) {
                mode = 'Claim';
            }
            else if (new eth_wallet_1.BigNumber(stakeQty).isZero()) {
                mode = 'Stake';
            }
            else {
                mode = 'Unlock';
            }
            let minimumLockTime = await timeIsMoney.minimumLockTime();
            let releaseTime = await timeIsMoney.releaseTime(currentAddress);
            let maximumTotalLock = await timeIsMoney.maximumTotalLock();
            let totalLockedWei = await timeIsMoney.totalLocked();
            let startOfEntryPeriod = '0';
            try {
                startOfEntryPeriod = (await timeIsMoney.startOfEntryPeriod()).toFixed();
            }
            catch (err) { }
            let endOfEntryPeriod = (await timeIsMoney.endOfEntryPeriod()).toFixed();
            let perAddressCapWei = await timeIsMoney.perAddressCap();
            let lockedTime = releaseTime.minus(minimumLockTime);
            let maxTotalLock = eth_wallet_1.Utils.fromDecimals(maximumTotalLock).toFixed();
            let totalLocked = eth_wallet_1.Utils.fromDecimals(totalLockedWei).toFixed();
            let perAddressCap = eth_wallet_1.Utils.fromDecimals(perAddressCapWei).toFixed();
            let tokenAddress = await timeIsMoney.token();
            let obj = {
                mode: mode,
                minLockTime: minimumLockTime.toNumber(),
                releaseTime: releaseTime.toNumber() * 1000,
                lockedTime: lockedTime.toNumber() * 1000,
                maxTotalLock: maxTotalLock,
                totalLocked: totalLocked,
                totalCredit: totalCredit,
                stakeQty: stakeQty,
                withdrawn: withdrawn,
                lockAmount: lockAmount,
                startOfEntryPeriod: parseInt(startOfEntryPeriod) * 1000,
                endOfEntryPeriod: parseInt(endOfEntryPeriod) * 1000,
                perAddressCap: perAddressCap,
                tokenAddress: tokenAddress.toLowerCase(),
            };
            if (hasRewardAddress) {
                let rewardsData = [];
                let promises = rewardOptions.map(async (option, index) => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            let referencePair = '';
                            if (option.rewardTokenAddress && store_1.tokenPriceAMMReference[chainId]) {
                                referencePair = store_1.tokenPriceAMMReference[chainId][option.rewardTokenAddress.toLowerCase()];
                            }
                            if (mode === 'Claim') {
                                let stakingRewardInfo = await getStakingRewardInfoByAddresses(option, currentAddress, releaseTime.toNumber());
                                if (stakingRewardInfo) {
                                    let vestedReward = new eth_wallet_1.BigNumber(totalCredit).times(stakingRewardInfo.multiplier).minus(stakingRewardInfo.claimSoFar).toFixed();
                                    rewardsData.push(Object.assign(Object.assign(Object.assign({}, option), stakingRewardInfo), { referencePair,
                                        vestedReward,
                                        index }));
                                }
                            }
                            else {
                                let rewardsContract;
                                if (option.isCommonStartDate) {
                                    rewardsContract = new oswap_time_is_money_contract_1.Contracts.RewardsCommonStartDate(wallet, option.address);
                                }
                                else {
                                    rewardsContract = new oswap_time_is_money_contract_1.Contracts.Rewards(wallet, option.address);
                                }
                                let admin = await rewardsContract.admin();
                                let multiplierWei = await rewardsContract.multiplier();
                                let multiplier = eth_wallet_1.Utils.fromDecimals(multiplierWei).toFixed();
                                rewardsData.push(Object.assign(Object.assign({}, option), { referencePair,
                                    multiplier,
                                    admin,
                                    index }));
                            }
                        }
                        catch (error) { }
                        resolve();
                    });
                });
                await Promise.all(promises);
                return Object.assign(Object.assign({}, obj), { rewardsData: rewardsData.sort((a, b) => a.index - b.index) });
            }
            else {
                return obj;
            }
        }
        catch (err) {
            console.log('err', err);
            return null;
        }
    };
    const composeCampaignInfoList = async (stakingCampaignInfoList, addDurationOption) => {
        var _a;
        let campaigns = [];
        for (let i = 0; i < stakingCampaignInfoList.length; i++) {
            let stakingCampaignInfo = stakingCampaignInfoList[i];
            let durationOptionsWithExtendedInfo = [];
            let durationOptions = stakingCampaignInfo.stakings;
            for (let j = 0; j < durationOptions.length; j++) {
                let durationOption = durationOptions[j];
                addDurationOption(durationOptionsWithExtendedInfo, durationOption);
            }
            let campaignObj = Object.assign(Object.assign({}, stakingCampaignInfo), { campaignName: stakingCampaignInfo.customName, campaignDesc: stakingCampaignInfo.customDesc, getTokenURL: stakingCampaignInfo.getTokenURL, options: durationOptionsWithExtendedInfo });
            if (durationOptionsWithExtendedInfo.length > 0) {
                const extendedInfo = durationOptionsWithExtendedInfo[0];
                const admin = extendedInfo.rewards && extendedInfo.rewards[0] ? extendedInfo.rewards[0].admin : '';
                campaignObj = Object.assign(Object.assign({}, campaignObj), { admin, campaignStart: extendedInfo.startOfEntryPeriod / 1000, campaignEnd: extendedInfo.endOfEntryPeriod / 1000, tokenAddress: (_a = extendedInfo.tokenAddress) === null || _a === void 0 ? void 0 : _a.toLowerCase() });
            }
            campaigns.push(campaignObj);
        }
        return campaigns;
    };
    const getAllCampaignsInfo = async (stakingInfo, imported) => {
        let wallet = eth_wallet_1.Wallet.getInstance();
        let chainId = wallet.chainId;
        let stakingCampaignInfoList = stakingInfo[chainId];
        if (!stakingCampaignInfoList)
            return [];
        let optionExtendedInfoMap = {};
        let allCampaignOptions = stakingCampaignInfoList.flatMap((v) => v.stakings);
        let promises = allCampaignOptions.map(async (option, index) => {
            return new Promise(async (resolve, reject) => {
                try {
                    let optionExtendedInfo;
                    if (imported) {
                        optionExtendedInfo = await getDefaultStakingByAddress(option);
                    }
                    else {
                        optionExtendedInfo = await getStakingOptionExtendedInfoByAddress(option);
                    }
                    if (optionExtendedInfo)
                        optionExtendedInfoMap[option.address] = optionExtendedInfo;
                }
                catch (error) { }
                resolve();
            });
        });
        await Promise.all(promises);
        let campaigns = await composeCampaignInfoList(stakingCampaignInfoList, (options, defaultOption) => {
            if (defaultOption.address && optionExtendedInfoMap[defaultOption.address]) {
                options.push(Object.assign(Object.assign({}, defaultOption), optionExtendedInfoMap[defaultOption.address]));
            }
        });
        if (imported) {
            return campaigns.map(campaign => {
                return Object.assign(Object.assign({}, campaign), { stakings: campaign.options });
            });
        }
        return campaigns;
    };
    exports.getAllCampaignsInfo = getAllCampaignsInfo;
    const getStakingTotalLocked = async (stakingAddress) => {
        let wallet = eth_wallet_1.Wallet.getInstance();
        let timeIsMoney = new oswap_time_is_money_contract_1.Contracts.TimeIsMoney(wallet, stakingAddress);
        let totalLockedWei = await timeIsMoney.totalLocked();
        let totalLocked = eth_wallet_1.Utils.fromDecimals(totalLockedWei).toFixed();
        return totalLocked;
    };
    exports.getStakingTotalLocked = getStakingTotalLocked;
    const getWETH = (wallet) => {
        let wrappedToken = store_1.WETHByChainId[wallet.chainId];
        return wrappedToken;
    };
    const getLPObject = async (pairAddress) => {
        try {
            let wallet = eth_wallet_1.Wallet.getInstance();
            const WETH = getWETH(wallet);
            let pair = new oswap_openswap_contract_1.Contracts.OSWAP_Pair(wallet, pairAddress);
            let getSymbol = await pair.symbol();
            let getName = await pair.name();
            let getDecimal = await pair.decimals();
            let token0 = (await pair.token0()).toLowerCase();
            let token1 = (await pair.token1()).toLowerCase();
            return {
                address: pairAddress.toLowerCase(),
                decimals: getDecimal.toFixed(),
                name: getName,
                symbol: getSymbol,
                token0: token0 == WETH.address.toLowerCase() ? '' : token0,
                token1: token1 == WETH.address.toLowerCase() ? '' : token1
            };
        }
        catch (e) {
            return null;
        }
    };
    exports.getLPObject = getLPObject;
    const getLPBalance = async (pairAddress) => {
        let wallet = eth_wallet_1.Wallet.getInstance();
        let pair = new oswap_openswap_contract_1.Contracts.OSWAP_Pair(wallet, pairAddress);
        let balance = await pair.balanceOf(wallet.address);
        return eth_wallet_1.Utils.fromDecimals(balance).toFixed();
    };
    exports.getLPBalance = getLPBalance;
    const getVaultObject = async (vaultAddress) => {
        try {
            let wallet = eth_wallet_1.Wallet.getInstance();
            let vault = new cross_chain_bridge_sdk_1.Contracts.OSWAP_BridgeVault(wallet, vaultAddress);
            let symbol = await vault.symbol();
            let name = await vault.name();
            let decimals = await vault.decimals();
            let tokenMap = store_1.getTokenMap();
            let assetToken = tokenMap[vaultAddress.toLowerCase()];
            return {
                address: vaultAddress.toLowerCase(),
                decimals,
                name,
                symbol,
                assetToken
            };
        }
        catch (_a) {
            return {};
        }
    };
    exports.getVaultObject = getVaultObject;
    const getVaultBalance = async (vaultAddress) => {
        let wallet = eth_wallet_1.Wallet.getInstance();
        let vault = new cross_chain_bridge_sdk_1.Contracts.OSWAP_BridgeVault(wallet, vaultAddress);
        let balance = await vault.balanceOf(wallet.address);
        return eth_wallet_1.Utils.fromDecimals(balance).toFixed();
    };
    exports.getVaultBalance = getVaultBalance;
    const getERC20RewardCurrentAPR = async (rewardOption, lockedToken, lockedDays) => {
        let wallet = eth_wallet_1.Wallet.getInstance();
        let chainId = wallet.chainId;
        const usdPeggedTokenAddress = store_1.USDPeggedTokenAddressMap[chainId];
        if (!usdPeggedTokenAddress)
            return '';
        let APR = "";
        let rewardPrice = await exports.getTokenPrice(rewardOption.rewardTokenAddress);
        let lockedTokenPrice = await exports.getTokenPrice(lockedToken.address);
        if (!rewardPrice || !lockedTokenPrice)
            return null;
        APR = new eth_wallet_1.BigNumber(rewardOption.multiplier).times(new eth_wallet_1.BigNumber(rewardPrice).times(365)).div(new eth_wallet_1.BigNumber(lockedTokenPrice).times(lockedDays)).toFixed();
        return APR;
    };
    exports.getERC20RewardCurrentAPR = getERC20RewardCurrentAPR;
    const getReservesByPair = async (pairAddress, tokenInAddress, tokenOutAddress) => {
        let wallet = eth_wallet_1.Wallet.getInstance();
        let reserveObj;
        let pair = new oswap_openswap_contract_1.Contracts.OSWAP_Pair(wallet, pairAddress);
        let reserves = await pair.getReserves();
        if (!tokenInAddress || !tokenOutAddress) {
            tokenInAddress = await pair.token0();
            tokenOutAddress = await pair.token1();
        }
        if (tokenInAddress && tokenOutAddress) {
            if (new eth_wallet_1.BigNumber(tokenInAddress.toLowerCase()).lt(tokenOutAddress.toLowerCase())) {
                reserveObj = {
                    reserveA: reserves._reserve0,
                    reserveB: reserves._reserve1
                };
            }
            else {
                reserveObj = {
                    reserveA: reserves._reserve1,
                    reserveB: reserves._reserve0
                };
            }
        }
        return reserveObj;
    };
    const getLPRewardCurrentAPR = async (rewardOption, lpObject, lockedDays) => {
        if (!lpObject)
            return '';
        let wallet = eth_wallet_1.Wallet.getInstance();
        const WETH = getWETH(wallet);
        const WETHAddress = WETH.address;
        let chainId = wallet.chainId;
        const usdPeggedTokenAddress = store_1.USDPeggedTokenAddressMap[chainId];
        if (!usdPeggedTokenAddress)
            return '';
        let APR = '';
        if (lpObject.token0.toLowerCase() == usdPeggedTokenAddress.toLowerCase() || lpObject.token1.toLowerCase() == usdPeggedTokenAddress.toLowerCase()) {
            let rewardPrice = '';
            if (rewardOption.APROption && rewardOption.APROption == 1) {
                let WETH9PriceFeedAddress = store_1.ToUSDPriceFeedAddressesMap[chainId][WETHAddress.toLowerCase()];
                if (!WETH9PriceFeedAddress)
                    return '';
                let aggregator = new chainlink_sdk_1.Contracts.EACAggregatorProxy(wallet, WETH9PriceFeedAddress);
                let WETH9LatestRoundData = await aggregator.latestRoundData();
                let WETH9PriceFeedDecimals = await aggregator.decimals();
                let WETH9USDPrice = new eth_wallet_1.BigNumber(WETH9LatestRoundData.answer).shiftedBy(-WETH9PriceFeedDecimals).toFixed();
                let rewardReserves = await getReservesByPair(rewardOption.referencePair, WETHAddress, rewardOption.rewardTokenAddress);
                if (!rewardReserves)
                    return '';
                rewardPrice = new eth_wallet_1.BigNumber(rewardReserves.reserveA).div(rewardReserves.reserveB).times(WETH9USDPrice).toFixed();
            }
            else {
                let rewardReserves = await getReservesByPair(rewardOption.referencePair, usdPeggedTokenAddress, rewardOption.rewardTokenAddress);
                if (!rewardReserves)
                    return '';
                rewardPrice = new eth_wallet_1.BigNumber(rewardReserves.reserveA).div(rewardReserves.reserveB).toFixed();
            }
            let lpTokenOut = lpObject.token0.toLowerCase() == usdPeggedTokenAddress.toLowerCase() ? lpObject.token1 : lpObject.token0;
            let lockedLPReserves = await getReservesByPair(lpObject.address, usdPeggedTokenAddress, lpTokenOut);
            if (!lockedLPReserves)
                return '';
            let lockedLPPrice = new eth_wallet_1.BigNumber(lockedLPReserves.reserveA).div(lockedLPReserves.reserveB).times(2).toFixed();
            APR = new eth_wallet_1.BigNumber(rewardOption.multiplier).times(new eth_wallet_1.BigNumber(rewardPrice).times(365)).div(new eth_wallet_1.BigNumber(lockedLPPrice).times(lockedDays)).toFixed();
        }
        else {
            if (!lpObject.token0 || !lpObject.token1 || lpObject.token0.toLowerCase() == WETHAddress.toLowerCase() || lpObject.token1.toLowerCase() == WETHAddress.toLowerCase()) {
                let WETH9PriceFeedAddress = store_1.ToUSDPriceFeedAddressesMap[chainId][WETHAddress.toLowerCase()];
                if (!WETH9PriceFeedAddress)
                    return '';
                let aggregator = new chainlink_sdk_1.Contracts.EACAggregatorProxy(wallet, WETH9PriceFeedAddress);
                let WETH9LatestRoundData = await aggregator.latestRoundData();
                let WETH9PriceFeedDecimals = await aggregator.decimals();
                let WETH9USDPrice = new eth_wallet_1.BigNumber(WETH9LatestRoundData.answer).shiftedBy(-WETH9PriceFeedDecimals).toFixed();
                let rewardReserves = await getReservesByPair(rewardOption.referencePair, WETHAddress, rewardOption.rewardTokenAddress);
                if (!rewardReserves)
                    return '';
                let rewardPrice = new eth_wallet_1.BigNumber(rewardReserves.reserveA).div(rewardReserves.reserveB).times(WETH9USDPrice).toFixed();
                let otherTokenAddress = (!lpObject.token0 || lpObject.token0.toLowerCase() == WETHAddress.toLowerCase()) ? lpObject.token1 : lpObject.token0;
                let lockedLPReserves = await getReservesByPair(lpObject.address, WETHAddress, otherTokenAddress);
                if (!lockedLPReserves)
                    return '';
                let otherTokenPrice = new eth_wallet_1.BigNumber(lockedLPReserves.reserveA).div(lockedLPReserves.reserveB).times(WETH9USDPrice).toFixed();
                let lockedLPPrice = new eth_wallet_1.BigNumber(otherTokenPrice).times(2).div(new eth_wallet_1.BigNumber(otherTokenPrice).div(WETH9USDPrice).sqrt()).toFixed();
                APR = new eth_wallet_1.BigNumber(rewardOption.multiplier).times(new eth_wallet_1.BigNumber(rewardPrice).times(365)).div(new eth_wallet_1.BigNumber(lockedLPPrice).times(lockedDays)).toFixed();
            }
        }
        return APR;
    };
    exports.getLPRewardCurrentAPR = getLPRewardCurrentAPR;
    const getVaultRewardCurrentAPR = async (rewardOption, vaultObject, lockedDays) => {
        let APR = '';
        try {
            let rewardPrice = await exports.getTokenPrice(rewardOption.rewardTokenAddress);
            let assetTokenPrice = await exports.getTokenPrice(vaultObject.assetToken.address);
            if (!assetTokenPrice || !rewardPrice)
                return '';
            let wallet = eth_wallet_1.Wallet.getInstance();
            let vault = new cross_chain_bridge_sdk_1.Contracts.OSWAP_BridgeVault(wallet, vaultObject.address);
            let vaultTokenTotalSupply = await vault.totalSupply();
            let lpAssetBalance = await vault.lpAssetBalance();
            let lpToAssetRatio = new eth_wallet_1.BigNumber(lpAssetBalance).div(vaultTokenTotalSupply).toFixed();
            let VaultTokenPrice = new eth_wallet_1.BigNumber(assetTokenPrice).times(lpToAssetRatio).toFixed();
            APR = new eth_wallet_1.BigNumber(rewardOption.multiplier).times(new eth_wallet_1.BigNumber(rewardPrice).times(365)).div(new eth_wallet_1.BigNumber(VaultTokenPrice).times(lockedDays)).toFixed();
        }
        catch (_a) { }
        return APR;
    };
    exports.getVaultRewardCurrentAPR = getVaultRewardCurrentAPR;
    const withdrawToken = async (contractAddress, callback) => {
        if (!contractAddress)
            return;
        try {
            let wallet = eth_wallet_1.Wallet.getInstance();
            let timeIsMoney = new oswap_time_is_money_contract_1.Contracts.TimeIsMoney(wallet, contractAddress);
            let receipt = await timeIsMoney.withdraw(true);
            return receipt;
        }
        catch (error) {
            if (callback) {
                callback(error);
            }
        }
    };
    exports.withdrawToken = withdrawToken;
    const claimToken = async (contractAddress, callback) => {
        if (!contractAddress)
            return;
        try {
            let wallet = eth_wallet_1.Wallet.getInstance();
            let rewards = new oswap_time_is_money_contract_1.Contracts.Rewards(wallet, contractAddress);
            let receipt = await rewards.claim();
            return receipt;
        }
        catch (error) {
            if (callback) {
                callback(error);
            }
        }
    };
    exports.claimToken = claimToken;
    const lockToken = async (token, amount, contractAddress) => {
        if (!token)
            return;
        if (!contractAddress)
            return;
        let wallet = eth_wallet_1.Wallet.getInstance();
        let decimals = typeof token.decimals === 'object' ? token.decimals.toNumber() : token.decimals;
        let tokenAmount = eth_wallet_1.Utils.toDecimals(amount, decimals);
        let timeIsMoney = new oswap_time_is_money_contract_1.Contracts.TimeIsMoney(wallet, contractAddress);
        let receipt = await timeIsMoney.lock(tokenAmount);
        return receipt;
    };
    exports.lockToken = lockToken;
    const getApprovalModelAction = (contractAddress, options) => {
        const approvalOptions = Object.assign(Object.assign({}, options), { spenderAddress: contractAddress });
        const approvalModel = new global_1.ERC20ApprovalModel(approvalOptions);
        let approvalModelAction = approvalModel.getAction();
        return approvalModelAction;
    };
    exports.getApprovalModelAction = getApprovalModelAction;
    const deployCampaign = async (campaign, callback) => {
        let listTransferReward = [];
        let wallet = store_1.getWallet();
        let result = Object.assign(Object.assign({}, campaign), { stakings: [] });
        try {
            for (const staking of campaign.stakings) {
                let timeIsMoney = new oswap_time_is_money_contract_1.Contracts.TimeIsMoney(wallet);
                let stakingResult;
                const { campaignStart, campaignEnd, admin } = campaign;
                const { lockTokenAddress, maxTotalLock, minLockTime, perAddressCap } = staking;
                let timeIsMoneyToken = new eth_wallet_1.Erc20(wallet, lockTokenAddress);
                let timeIsMoneyTokenDecimals = await timeIsMoneyToken.decimals;
                const stakingAddress = await timeIsMoney.deploy({
                    token: lockTokenAddress,
                    maximumTotalLock: eth_wallet_1.Utils.toDecimals(maxTotalLock, timeIsMoneyTokenDecimals),
                    minimumLockTime: minLockTime,
                    startOfEntryPeriod: campaignStart,
                    endOfEntryPeriod: campaignEnd,
                    perAddressCap: eth_wallet_1.Utils.toDecimals(perAddressCap, timeIsMoneyTokenDecimals),
                });
                let rewardResult = [];
                for (const reward of staking.rewards) {
                    const { multiplier, rewardTokenAddress, initialReward, vestingPeriod, isCommonStartDate, vestingStartDate, claimDeadline } = reward;
                    let rewardToken = new eth_wallet_1.Erc20(wallet, rewardTokenAddress);
                    let rewardTokenDecimals = await rewardToken.decimals;
                    let params = {
                        timeIsMoney: timeIsMoney.address,
                        token: rewardTokenAddress,
                        multiplier: eth_wallet_1.Utils.toDecimals(multiplier, rewardTokenDecimals),
                        initialReward: eth_wallet_1.Utils.toDecimals(initialReward, rewardTokenDecimals),
                        vestingPeriod,
                        claimDeadline,
                        admin,
                    };
                    let rewardsContract;
                    if (isCommonStartDate) {
                        rewardsContract = new oswap_time_is_money_contract_1.Contracts.RewardsCommonStartDate(wallet);
                        params = Object.assign(Object.assign({}, params), { vestingStartDate });
                    }
                    else {
                        rewardsContract = new oswap_time_is_money_contract_1.Contracts.Rewards(wallet);
                    }
                    const rewardAddress = await rewardsContract.deploy(params);
                    rewardResult.push(Object.assign(Object.assign({}, reward), { address: rewardAddress }));
                    listTransferReward.push({
                        to: rewardAddress,
                        value: eth_wallet_1.Utils.toDecimals(maxTotalLock.multipliedBy(multiplier), rewardTokenDecimals),
                        rewardTokenAddress,
                    });
                }
                ;
                stakingResult = Object.assign(Object.assign({}, staking), { address: stakingAddress, rewards: rewardResult });
                result.stakings.push(stakingResult);
            }
        }
        catch (error) {
            if (callback) {
                callback(error, null);
            }
            return null;
        }
        try {
            // Transfer max reward from the admin to the reward contract.
            for (const transferReward of listTransferReward) {
                const { to, value, rewardTokenAddress } = transferReward;
                const contract = new oswap_openswap_contract_1.Contracts.OSWAP_ERC20(wallet, rewardTokenAddress);
                await contract.transfer({ to, value });
            }
        }
        catch (error) {
            if (callback) {
                callback(error, null);
            }
        }
        return result;
    };
    exports.deployCampaign = deployCampaign;
});

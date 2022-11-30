import { BigNumber } from "@ijstech/eth-wallet";

enum LockTokenType {
  ERC20_Token,
  LP_Token,
  VAULT_Token
}

const LockTokenTypeList = [
  { name: 'ERC20_Token', value: LockTokenType.ERC20_Token },
  { name: 'LP_Token', value: LockTokenType.LP_Token },
  { name: 'VAULT_Token', value: LockTokenType.VAULT_Token },
]

interface StakingCampaign {
  //custom
  chainId?: number,
  customName: string,
  customDesc?: string,
  customLogo?: string,
  getTokenURL?: string,
  campaignStart: BigNumber, //unix
  campaignEnd: BigNumber, //unix
  showContractLink?: boolean,
  admin: string, // can only withdraw remaining fund after claimDeadline.
  customColorCampaign?: string, // 1 campaign main color
  customColorBackground?: string, // 2 campign background
  customColorStakingBackground?: string, // 3 staking background
  customColorButton?: string, // 4 staking button
  customColorText?: string, // 5 text
  customColorTimeBackground? :string, //6 string end countdown background

  stakings: Staking[],
}

interface RewardNeeded {
  value: BigNumber,
  tokenAddress: string,
}

interface Staking {
  //contract
  address?: string,
  lockTokenAddress: string,
  minLockTime: BigNumber, //in second 
  perAddressCap: BigNumber,
  maxTotalLock: BigNumber,

  //custom
  customDesc?: string,
  lockTokenType: LockTokenType,
  decimalsOffset?: number,
  totalRewardAmount?: RewardNeeded[], // total reward needed

  rewards: Reward[]
}

interface Reward {
  //contract
  address?: string,
  rewardTokenAddress: string,
  multiplier: BigNumber, //lockAmount * multiplier = rewardAmount
  rewardAmount?: BigNumber, // reward needed
  initialReward: BigNumber, // 0 <= initialReward <= 1; lockAmount * initialReward = initialRewardAmount;
  vestingPeriod: BigNumber, // in second
  claimDeadline: BigNumber, //unix
  admin: string, // can only withdraw remaining fund after claimDeadline.
  isCommonStartDate?: boolean,
  vestingStartDate?: BigNumber //unix
}

const USDPeggedTokenAddressMap: { [key: number]: string } = {
  56: '0xe9e7cea3dedca5984780bafc599bd69add087d56', //BUSD
  97: '0xDe9334C157968320f26e449331D6544b89bbD00F', //BUSD
  43113: '0xb9c31ea1d475c25e58a1be1a46221db55e5a7c6e', //USDT.e
  43114: '0xc7198437980c041c805a1edcba50c1ce5db95118', //USDT.e
}

export {
  StakingCampaign,
  Staking,
  Reward,
  RewardNeeded,
  LockTokenType,
  LockTokenTypeList,
  USDPeggedTokenAddressMap
}

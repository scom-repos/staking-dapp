var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@staking/manage-stake/manage-stake.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    components_1.Styles.cssRule('.staking-manage-stake', {
        $nest: {
            'input': {
                $nest: {
                    '&::-webkit-outer-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: '0',
                    },
                    '&::-webkit-inner-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: '0',
                    },
                }
            },
            '.staking-token-input > input': {
                border: 'none',
                width: '100% !important',
                height: '100% !important',
                backgroundColor: 'transparent',
                color: '#fff',
                fontSize: '1rem',
                textAlign: 'left',
                paddingInline: 8,
            },
        }
    });
});
define("@staking/manage-stake/manage-stake.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/result", "@staking/staking-utils", "@staking/manage-stake/manage-stake.css.ts"], function (require, exports, components_2, eth_wallet_1, global_1, store_1, result_1, staking_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ManageStake = void 0;
    const isThemeApplied = false;
    var CurrentMode;
    (function (CurrentMode) {
        CurrentMode[CurrentMode["STAKE"] = 0] = "STAKE";
        CurrentMode[CurrentMode["UNLOCK"] = 1] = "UNLOCK";
    })(CurrentMode || (CurrentMode = {}));
    ;
    let ManageStake = class ManageStake extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this.stakingInfo = {};
            this.lockedTokenObject = {};
            this.maxQty = 0;
            this.availableQty = '0';
            this.balance = '0';
            this.perAddressCap = '0';
            this.stakeQty = '0';
            this.tokenSymbol = '';
            this.currentMode = CurrentMode.STAKE;
            this.tokenBalances = {};
            this.tokenMap = {};
            this.setData = (data) => {
                this.address = data.address;
                this.stakingInfo = data;
                this.onSetupPage(store_1.isWalletConnected());
            };
            this.getBalance = () => {
                return this.balance;
            };
            this.needToBeApproval = () => {
                return this.btnApprove && this.btnApprove.visible;
            };
            this.showResultMessage = (result, status, content) => {
                if (!result)
                    return;
                let params = { status };
                if (status === 'success') {
                    params.txtHash = content;
                }
                else {
                    params.content = content;
                }
                result.message = Object.assign({}, params);
                result.showModal();
            };
            this.onApproveToken = async () => {
                this.showResultMessage(this.stakingResult, 'warning', `Approve ${this.tokenSymbol}`);
                this.approvalModelAction.doApproveAction(this.lockedTokenObject, this.inputAmount.value);
            };
            this.onStake = async () => {
                this.currentMode = CurrentMode.STAKE;
                this.approvalModelAction.doPayAction();
            };
            this.onUnstake = () => {
                this.currentMode = CurrentMode.UNLOCK;
                this.approvalModelAction.doPayAction();
            };
            this.onInputAmount = () => {
                var _a;
                if (this.inputAmount.enabled === false)
                    return;
                this.currentMode = CurrentMode.STAKE;
                global_1.limitInputNumber(this.inputAmount, ((_a = this.lockedTokenObject) === null || _a === void 0 ? void 0 : _a.decimals) || 18);
                this.approvalModelAction.checkAllowance(this.lockedTokenObject, this.inputAmount.value);
            };
            this.setMaxBalance = () => {
                var _a;
                this.currentMode = CurrentMode.STAKE;
                this.inputAmount.value = eth_wallet_1.BigNumber.min(this.availableQty, this.balance, this.perAddressCap).toFixed();
                global_1.limitInputNumber(this.inputAmount, ((_a = this.lockedTokenObject) === null || _a === void 0 ? void 0 : _a.decimals) || 18);
                this.approvalModelAction.checkAllowance(this.lockedTokenObject, this.inputAmount.value);
            };
            this.renderStakingInfo = async (info) => {
                var _a;
                if (!info || !Object.keys(info).length) {
                    this.btnApprove.visible = false;
                    if (!store_1.isWalletConnected()) {
                        this.btnMax.visible = false;
                        this.inputAmount.enabled = false;
                    }
                    return;
                }
                ;
                const colorButton = isThemeApplied ? info.customColorButton : undefined;
                const colorText = isThemeApplied ? info.customColorText || '#fff' : '#fff';
                this.btnApprove.background = { color: `${colorButton} !important` };
                this.btnStake.background = { color: `${colorButton} !important` };
                this.btnUnstake.background = { color: `${colorButton} !important` };
                this.btnMax.background = { color: `${colorButton} !important` };
                this.lbToken.font = { color: colorText };
                this.btnStake.id = `btn-stake-${this.address}`;
                this.btnUnstake.id = `btn-unstake-${this.address}`;
                this.inputAmount.id = `input-${this.address}`;
                let lpTokenData = {};
                let vaultTokenData = {};
                const { tokenAddress, lockTokenType, mode } = info;
                if (tokenAddress && mode === 'Stake') {
                    if (lockTokenType == store_1.LockTokenType.LP_Token) {
                        lpTokenData = {
                            'object': await staking_utils_1.getLPObject(tokenAddress),
                            'balance': await staking_utils_1.getLPBalance(tokenAddress)
                        };
                    }
                    else if (lockTokenType == store_1.LockTokenType.VAULT_Token) {
                        vaultTokenData = {
                            'object': await staking_utils_1.getVaultObject(tokenAddress),
                            'balance': await staking_utils_1.getVaultBalance(tokenAddress)
                        };
                    }
                }
                const tokenInfo = {
                    tokenAddress: tokenAddress,
                    lpToken: lpTokenData,
                    vaultToken: vaultTokenData
                };
                this.lockedTokenObject = store_1.getLockedTokenObject(info, tokenInfo, this.tokenMap);
                const defaultDecimalsOffset = 18 - (((_a = this.lockedTokenObject) === null || _a === void 0 ? void 0 : _a.decimals) || 18);
                const symbol = store_1.getLockedTokenSymbol(info, this.lockedTokenObject);
                this.tokenSymbol = symbol;
                this.perAddressCap = new eth_wallet_1.BigNumber(info.perAddressCap).shiftedBy(defaultDecimalsOffset).toFixed();
                this.maxQty = new eth_wallet_1.BigNumber(info.maxTotalLock).shiftedBy(defaultDecimalsOffset).toNumber();
                this.stakeQty = new eth_wallet_1.BigNumber(info.stakeQty).shiftedBy(defaultDecimalsOffset).toFixed();
                const totalLocked = new eth_wallet_1.BigNumber(info.totalLocked).shiftedBy(defaultDecimalsOffset);
                this.availableQty = new eth_wallet_1.BigNumber(this.maxQty).minus(totalLocked).toFixed();
                this.btnApprove.visible = false;
                // Unstake
                if (CurrentMode[mode.toUpperCase()] !== CurrentMode.STAKE) {
                    this.approvalModelAction.checkAllowance(this.lockedTokenObject, this.stakeQty);
                    this.btnStake.visible = false;
                    this.wrapperInputAmount.visible = false;
                    this.btnUnstake.visible = true;
                }
                else {
                    this.btnStake.visible = true;
                    this.wrapperInputAmount.visible = true;
                    this.btnUnstake.visible = false;
                }
                // Stake
                if (tokenAddress && mode === 'Stake') {
                    if (lockTokenType == store_1.LockTokenType.ERC20_Token) {
                        await store_1.setTokenBalances();
                        let balances = store_1.getTokenBalances();
                        this.tokenBalances = Object.keys(balances).reduce((accumulator, key) => {
                            accumulator[key.toLowerCase()] = balances[key];
                            return accumulator;
                        }, {});
                        this.balance = this.tokenBalances[tokenAddress] || '0';
                    }
                    else if (lockTokenType == store_1.LockTokenType.LP_Token) {
                        this.balance = new eth_wallet_1.BigNumber(lpTokenData.balance || 0).shiftedBy(defaultDecimalsOffset).toFixed();
                    }
                    else if (lockTokenType == store_1.LockTokenType.VAULT_Token) {
                        this.balance = new eth_wallet_1.BigNumber(vaultTokenData.balance || 0).shiftedBy(defaultDecimalsOffset).toFixed();
                    }
                    this.btnMax.visible = true;
                    this.lbToken.caption = symbol;
                }
                this.updateEnableInput();
            };
            this.onSetupPage = async (connected) => {
                if (!connected) {
                    this.btnStake.enabled = false;
                    this.btnUnstake.enabled = false;
                    this.btnApprove.visible = false;
                    this.inputAmount.enabled = false;
                    this.renderStakingInfo(null);
                    return;
                }
                this.tokenMap = store_1.getTokenMap();
                await this.initApprovalModelAction();
                await this.renderStakingInfo(this.stakingInfo);
            };
            this.updateEnableInput = async () => {
                var _a, _b;
                if (((_a = this.stakingInfo) === null || _a === void 0 ? void 0 : _a.mode) !== 'Stake')
                    return;
                const totalLocked = await staking_utils_1.getStakingTotalLocked(this.address);
                const activeStartTime = this.stakingInfo ? this.stakingInfo.startOfEntryPeriod : 0;
                const activeEndTime = this.stakingInfo ? this.stakingInfo.endOfEntryPeriod : 0;
                const lockedTokenDecimals = ((_b = this.lockedTokenObject) === null || _b === void 0 ? void 0 : _b.decimals) || 18;
                const defaultDecimalsOffset = 18 - lockedTokenDecimals;
                const optionQty = new eth_wallet_1.BigNumber(this.stakingInfo.maxTotalLock).minus(totalLocked).shiftedBy(defaultDecimalsOffset);
                const isStarted = components_2.moment(activeStartTime).diff(components_2.moment()) <= 0;
                const isClosed = components_2.moment(activeEndTime).diff(components_2.moment()) <= 0;
                const enabled = (isStarted && !(optionQty.lte(0) || isClosed));
                this.inputAmount.enabled = enabled;
                this.btnMax.enabled = enabled && new eth_wallet_1.BigNumber(this.balance).gt(0);
            };
        }
        get actionKey() {
            if (this.currentMode === CurrentMode.STAKE) {
                return `#btn-stake-${this.address}`;
            }
            return `#btn-unstake-${this.address}`;
        }
        async initApprovalModelAction() {
            this.approvalModelAction = staking_utils_1.getApprovalModelAction(this.address, {
                sender: this,
                payAction: async () => {
                    this.showResultMessage(this.stakingResult, 'warning', `${this.currentMode === CurrentMode.STAKE ? 'Stake' : 'Unlock'} ${this.tokenSymbol}`);
                    if (this.currentMode === CurrentMode.STAKE) {
                        staking_utils_1.lockToken(this.lockedTokenObject, this.inputAmount.value, this.address);
                    }
                    else {
                        staking_utils_1.withdrawToken(this.address);
                    }
                },
                onToBeApproved: async (token) => {
                    if (new eth_wallet_1.BigNumber(this.inputAmount.value).lte(eth_wallet_1.BigNumber.min(this.availableQty, this.balance, this.perAddressCap))) {
                        this.btnApprove.caption = `Approve ${token.symbol}`;
                        this.btnApprove.visible = true;
                        this.btnApprove.enabled = true;
                    }
                    else {
                        this.btnApprove.visible = false;
                    }
                    this.btnStake.enabled = false;
                    this.btnUnstake.enabled = false;
                },
                onToBePaid: async (token) => {
                    var _a;
                    this.btnApprove.visible = false;
                    const isClosed = components_2.moment(((_a = this.stakingInfo) === null || _a === void 0 ? void 0 : _a.endOfEntryPeriod) || 0).diff(components_2.moment()) <= 0;
                    if (this.currentMode === CurrentMode.STAKE) {
                        const amount = new eth_wallet_1.BigNumber(this.inputAmount.value);
                        if (amount.gt(this.balance)) {
                            this.btnStake.caption = 'Insufficient Balance';
                            this.btnStake.enabled = false;
                            return;
                        }
                        this.btnStake.caption = 'Stake';
                        if (amount.isNaN() || amount.lte(0) || amount.gt(eth_wallet_1.BigNumber.min(this.availableQty, this.balance, this.perAddressCap))) {
                            this.btnStake.enabled = false;
                        }
                        else {
                            this.btnStake.enabled = !isClosed;
                        }
                    }
                    this.btnUnstake.enabled = this.stakingInfo.mode !== 'Stake' && new eth_wallet_1.BigNumber(this.stakeQty).gt(0);
                },
                onApproving: async (token, receipt) => {
                    if (receipt) {
                        this.showResultMessage(this.stakingResult, 'success', receipt);
                        this.btnApprove.caption = `Approving`;
                        this.btnApprove.enabled = false;
                        this.btnApprove.rightIcon.visible = true;
                        this.btnMax.enabled = false;
                        this.inputAmount.enabled = false;
                    }
                },
                onApproved: async (token) => {
                    await store_1.setTokenBalances();
                    await this.updateEnableInput();
                    this.btnApprove.rightIcon.visible = false;
                    this.btnApprove.visible = false;
                },
                onApprovingError: async (token, err) => {
                    this.showResultMessage(this.stakingResult, 'error', err);
                    this.btnApprove.rightIcon.visible = false;
                    this.btnMax.enabled = new eth_wallet_1.BigNumber(this.balance).gt(0);
                    this.inputAmount.enabled = true;
                },
                onPaying: async (receipt) => {
                    if (receipt) {
                        this.showResultMessage(this.stakingResult, 'success', receipt);
                        this.inputAmount.enabled = false;
                        this.btnMax.enabled = false;
                        if (this.currentMode === CurrentMode.STAKE) {
                            this.btnStake.caption = 'Staking';
                            this.btnStake.rightIcon.visible = true;
                            store_1.setStakingStatus(this.actionKey, true, 'Staking');
                            this.btnUnstake.enabled = false;
                        }
                        else {
                            this.btnUnstake.caption = 'Unstaking';
                            this.btnUnstake.rightIcon.visible = true;
                            store_1.setStakingStatus(this.actionKey, true, 'Unstaking');
                            this.btnStake.enabled = false;
                        }
                    }
                },
                onPaid: async () => {
                    const caption = this.currentMode === CurrentMode.STAKE ? 'Unstake' : 'Stake';
                    if (this.onRefresh) {
                        await store_1.setTokenBalances();
                        await this.onRefresh();
                        store_1.setStakingStatus(this.actionKey, false, caption);
                    }
                    if (this.currentMode === CurrentMode.STAKE) {
                        this.btnStake.caption = 'Stake';
                        this.btnStake.rightIcon.visible = false;
                    }
                    else {
                        this.btnUnstake.caption = 'Unstake';
                        this.btnUnstake.rightIcon.visible = false;
                    }
                    await this.updateEnableInput();
                    this.inputAmount.value = '';
                    this.btnStake.enabled = false;
                    this.btnUnstake.enabled = this.stakingInfo.mode !== 'Stake' && new eth_wallet_1.BigNumber(this.stakeQty).gt(0);
                },
                onPayingError: async (err) => {
                    await this.updateEnableInput();
                    const caption = this.currentMode === CurrentMode.STAKE ? 'Stake' : 'Unstake';
                    if (this.currentMode === CurrentMode.STAKE) {
                        this.btnStake.caption = 'Stake';
                        this.btnStake.rightIcon.visible = false;
                    }
                    else {
                        this.btnUnstake.caption = 'Unstake';
                        this.btnUnstake.rightIcon.visible = false;
                    }
                    this.showResultMessage(this.stakingResult, 'error', err);
                    store_1.setStakingStatus(this.actionKey, false, caption);
                }
            });
        }
        init() {
            super.init();
            this.stakingResult = new result_1.Result();
            this.appendChild(this.stakingResult);
        }
        render() {
            return (this.$render("i-panel", { class: "staking-manage-stake" },
                this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "center" },
                    this.$render("i-hstack", { id: "wrapperInputAmount", gap: 4, width: 280, height: 36, padding: { right: 8 }, background: { color: '#232B5A' }, border: { radius: 8 }, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-input", { id: "inputAmount", inputType: "number", placeholder: "0.0", class: "staking-token-input", width: "100%", height: "100%", onChanged: () => this.onInputAmount() }),
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-button", { id: "btnMax", caption: "Max", enabled: false, class: "btn-os", width: 45, minHeight: 25, onClick: () => this.setMaxBalance() }),
                            this.$render("i-label", { id: "lbToken", font: { size: '14px' }, class: "opacity-50" }))),
                    this.$render("i-hstack", { gap: 10, width: "calc(100% - 290px)" },
                        this.$render("i-button", { id: "btnApprove", caption: "Approve", enabled: false, visible: false, width: "100%", minHeight: 36, border: { radius: 12 }, rightIcon: { spin: true, visible: false, fill: '#fff' }, class: "btn-os", onClick: () => this.onApproveToken() }),
                        this.$render("i-button", { id: "btnStake", caption: "Stake", enabled: false, width: "100%", minHeight: 36, border: { radius: 12 }, rightIcon: { spin: true, visible: false, fill: '#fff' }, class: "btn-os", onClick: () => this.onStake() }),
                        this.$render("i-button", { id: "btnUnstake", caption: "Unstake", enabled: false, width: "100%", minHeight: 36, border: { radius: 12 }, rightIcon: { spin: true, visible: false, fill: '#fff' }, class: "btn-os", onClick: () => this.onUnstake() })))));
        }
    };
    ManageStake = __decorate([
        components_2.customElements('staking-manage-stake')
    ], ManageStake);
    exports.ManageStake = ManageStake;
});
define("@staking/manage-stake", ["require", "exports", "@staking/manage-stake/manage-stake.tsx"], function (require, exports, manage_stake_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ManageStake = void 0;
    Object.defineProperty(exports, "ManageStake", { enumerable: true, get: function () { return manage_stake_1.ManageStake; } });
});

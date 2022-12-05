var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@staking/main/manageStake/manage-stake.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
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
define("@staking/main/manageStake/manage-stake.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/result", "@staking/staking-utils", "@staking/main/manageStake/manage-stake.css.ts"], function (require, exports, components_2, eth_wallet_1, global_1, store_1, result_1, staking_utils_1) {
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
        components_2.customElements('manage-stake')
    ], ManageStake);
    exports.ManageStake = ManageStake;
});
define("@staking/main/manageStake/index.tsx", ["require", "exports", "@staking/main/manageStake/manage-stake.tsx"], function (require, exports, manage_stake_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ManageStake = void 0;
    Object.defineProperty(exports, "ManageStake", { enumerable: true, get: function () { return manage_stake_1.ManageStake; } });
});
define("@staking/main/panelConfig/panel-config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    components_3.Styles.cssRule('.panel-config', {
        background: "#192046",
        padding: '1rem',
        margin: 'auto',
        $nest: {
            '.modal': {
                width: 800,
                maxWidth: '100%',
                borderRadius: '1rem',
                padding: '1.5rem 1rem',
            },
            'i-button': {
                padding: '6px 12px',
                textAlign: 'center',
            },
            '.pnl-label': {
                $nest: {
                    'i-icon': {
                        display: 'none',
                        cursor: 'pointer'
                    },
                    '&:hover i-icon': {
                        display: 'block',
                    },
                }
            },
            '.btn-item': {
                background: `#f50057 !important`,
                borderRadius: 0,
                color: '#FFFFFF',
                $nest: {
                    '&.btn-active': {
                        background: `#F15E61 !important`,
                        cursor: 'default',
                    }
                }
            },
            '.w-input': {
                width: 'calc(100% - 190px) !important',
            },
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
                    '&:focus::placeholder': {
                        opacity: 0,
                    }
                }
            },
            '.input-area': {
                height: '80px !important',
                borderRadius: 12,
                padding: 8,
                background: "#0C1234",
                $nest: {
                    'textarea': {
                        width: '100% !important',
                        height: '100% !important',
                        background: 'transparent',
                        boxShadow: 'none',
                        outline: 'none',
                        border: 'none',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                    }
                }
            },
            '.input-text': {
                height: '40px !important',
                borderRadius: 12,
                paddingInline: 8,
                background: "#0C1234",
                $nest: {
                    '&.w-100': {
                        width: '100% !important',
                    },
                    input: {
                        border: 'none',
                        width: '100% !important',
                        height: '100% !important',
                        backgroundColor: 'transparent',
                        color: '#FFFFFF',
                        fontSize: '1rem',
                        textAlign: 'left'
                    },
                }
            },
            '.main-content': {
                $nest: {
                    '.lb-title ': {
                        color: '#fff'
                    },
                }
            },
            '#lbMinLockTime': {
                opacity: 0.8
            },
            'token-selection.disabled #btnToken': {
                cursor: 'default !important',
            },
            '.network-selection': {
                $nest: {
                    '.btn-select:hover': {
                        background: `rgba(0, 0, 0, 0.54) !important`,
                    },
                    '.btn-select.disabled': {
                        color: `#fff !important`,
                        cursor: 'default !important',
                    },
                    '.modal': {
                        padding: '0.75rem 0',
                        background: '#0C1234',
                        borderRadius: 6,
                        border: `1px solid #2c387e`,
                        $nest: {
                            '& > i-vstack': {
                                maxHeight: '40vh',
                                overflow: 'auto',
                            },
                            'i-button': {
                                boxShadow: 'none',
                                color: '#FFFFFF'
                            },
                            'i-button:hover': {
                                background: `linear-gradient(254.8deg, rgba(231,91,102,.1) -8.08%, rgba(181,32,130,.1) 84.35%) !important`,
                            },
                        },
                    },
                },
            },
            'i-checkbox .checkmark': {
                backgroundColor: "#0C1234",
                border: `1px solid #6573c3`,
                borderRadius: 6,
                width: 20,
                height: 20,
                $nest: {
                    '&:after': {
                        borderWidth: 2,
                        top: 3
                    }
                }
            },
            'i-checkbox.is-checked .checkmark': {
                backgroundColor: '#f73378'
            },
            '.cs-upload': {
                maxWidth: 300,
                minHeight: '150px !important',
                height: '150px !important',
                borderRadius: 12,
                padding: 4,
                $nest: {
                    '.i-upload-wrapper': {
                        margin: 4,
                        height: '100%',
                        cursor: 'pointer',
                        borderColor: '#F15E61'
                    },
                    '.i-upload-wrapper i-button': {
                        background: '#F15E61',
                        color: '#FFFFFF'
                    },
                    '.i-upload_preview': {
                        minHeight: 'auto',
                    },
                    'i-image': {
                        display: 'flex',
                    },
                    'i-image img': {
                        margin: 'auto',
                        objectFit: 'contain',
                        width: 300,
                        height: 150,
                    },
                }
            },
            '.cs-datepicker': {
                background: '#0C1234',
                borderRadius: 12,
                maxWidth: 300,
                $nest: {
                    'input[type="text"]': {
                        background: 'transparent',
                        height: '40px !important',
                        width: '100% !important',
                        border: 'none',
                        padding: '1rem',
                        fontSize: '1rem',
                        textAlign: 'center',
                        color: '#FFFFFF',
                    },
                    'input::placeholder': {
                        color: '#717171',
                    },
                    '.datepicker-toggle': {
                        display: 'flex',
                        width: '100% !important',
                        maxWidth: 300,
                        height: '40px !important',
                        padding: 0,
                        position: 'absolute',
                        top: 0,
                        margin: 0,
                        background: 'transparent',
                    },
                    'i-icon': {
                        width: '100%',
                    },
                    'svg': {
                        display: 'none',
                    }
                },
            },
            '.cursor-pointer': {
                cursor: 'pointer',
            },
            '&.custom-scroll *': {
                $nest: {
                    '&::-webkit-scrollbar-track': {
                        background: 'transparent',
                    },
                    '&::-webkit-scrollbar': {
                        width: '5px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#F15E61',
                        borderRadius: '5px',
                    }
                }
            },
            '#loadingElm.i-loading--active': {
                marginTop: '2rem',
                position: 'initial',
                $nest: {
                    '.i-loading-spinner': {
                        marginTop: '2rem',
                    },
                },
            },
            '@media screen and (max-width: 525px)': {
                $nest: {
                    '.main-content': {
                        $nest: {
                            '.w-input': {
                                width: '100% !important'
                            },
                            '.row-mobile': {
                                flexWrap: 'nowrap',
                                $nest: {
                                    '.lb-title': {
                                        whiteSpace: 'nowrap',
                                    }
                                }
                            },
                            '.network-selection': {
                                $nest: {
                                    'i-button': {
                                        maxWidth: 'inherit !important',
                                    },
                                    'i-modal': {
                                        width: '100%',
                                        maxWidth: 'inherit !important',
                                        $nest: {
                                            '.modal': {
                                                background: '#192046',
                                                maxWidth: 'inherit !important',
                                            }
                                        }
                                    }
                                }
                            },
                            'i-hstack': {
                                flexWrap: 'wrap',
                            },
                        }
                    }
                }
            }
        }
    });
});
define("@staking/main/panelConfig/token-selection/tokenSelection.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    components_4.Styles.cssRule('.token-selection', {
        $nest: {
            '#tokenSearch': {
                width: '100% !important',
            },
            '.token-agree-input': {
                $nest: {
                    '.i-checkbox_label': {
                        fontSize: '1.5rem',
                        color: '#f6c958',
                        width: '150px !important'
                    },
                    '.checkmark': {
                        height: '30px',
                        width: '30px',
                        background: 'none',
                        border: `3px solid #6573c3`,
                    },
                    '.checkmark:after': {
                        border: `3px solid #6573c3`,
                        height: '16px',
                        left: '7.5px',
                        top: '0px',
                        width: '7px',
                        borderLeft: 0,
                        borderTop: 0,
                    }
                }
            },
            '.btn-source-panel': {
                padding: '5px',
                display: 'inline-block',
                background: 'linear-gradient(90deg, #a8327f 0%, #d4626a 100%)',
                borderRadius: '5px',
            },
            '.token-import-input': {
                width: '100%',
                $nest: {
                    'input': {
                        width: '100%',
                        background: 'none',
                        color: 'blue',
                        border: 'none',
                        fontSize: '1rem',
                        margin: '5px 0',
                    }
                }
            },
            '.pnl-token-import': {
                border: `2px solid #6573c3`,
                borderRadius: '0.75rem',
                margin: '1rem 0',
                padding: '1.25rem 1rem 1rem'
            },
            '.i-modal_header > i-icon': {
                fill: `#F15E61 !important`
            },
            'i-icon': {
                display: 'inline-block'
            },
            '.btn-import': {
                background: 'linear-gradient(90deg, #a8327f 0%, #d4626a 100%)',
                borderRadius: '5px',
                color: '#fff',
                fontSize: '1rem',
                padding: '0.25rem 1.25rem'
            },
            '::-webkit-scrollbar': {
                width: '3px',
            },
            '::-webkit-scrollbar-thumb': {
                background: '#F15E61',
                borderRadius: '5px',
            },
            '.ml-auto': {
                marginLeft: 'auto',
            },
            '.custom-btn': {
                display: 'flex',
                alignItems: 'center',
                width: 'max-content',
                padding: '0.25rem 0.5rem',
                boxShadow: 'none',
                background: 'linear-gradient(90deg, #a8327f 0%, #d4626a 100%)',
                $nest: {
                    '&:hover': {
                        background: 'linear-gradient(90deg, #a8327f 0%, #d4626a 100%)',
                        opacity: .9
                    },
                    '&.disabled': {
                        background: 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box',
                        opacity: 1
                    },
                    '> i-icon': {
                        marginRight: '0',
                        height: '18px !important',
                    },
                    '> i-image': {
                        lineHeight: 'initial',
                        marginRight: '0.5rem',
                    },
                    '&.has-token': {
                        background: 'transparent',
                        fontWeight: 'bold',
                        color: '#f6c958',
                        paddingRight: '0',
                        $nest: {
                            '> i-icon': {
                                marginRight: '-7px',
                                fill: '#F15E61',
                            }
                        }
                    },
                },
            },
            '#btnMax': {
                marginRight: '0.25rem',
            },
            '#btnToken': {
                background: '#0C1234',
                color: '#FFFFFF',
                height: '40px',
                width: '100%',
                padding: '0.5rem 0.75rem',
                maxWidth: '300px',
                borderRadius: '12px',
                $nest: {
                    'i-icon': {
                        marginLeft: '0.25rem',
                    },
                }
            },
            '.bg-modal': {
                $nest: {
                    '.modal': {
                        background: '#192046',
                        width: 500,
                        maxWidth: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '1rem',
                        color: '#fff',
                        marginTop: 40
                    },
                }
            },
            '#tokenImportModal.bg-modal .modal': {
                width: 400,
            },
            '#tokenSelectionModal': {
                $nest: {
                    '.i-modal_header': {
                        marginBottom: '1.5rem',
                        paddingBottom: '0.5rem',
                        borderBottom: `2px solid #F15E61`,
                        color: '#F15E61',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                    },
                    '.i-modal_header > span': {
                        color: '#F15E61',
                    },
                    '.i-modal_header > i-icon': {
                        fill: `#F15E61 !important`
                    },
                    '.search': {
                        position: 'relative',
                        marginBottom: '1.5rem',
                        $nest: {
                            'i-icon': {
                                position: 'absolute',
                                top: 'calc(50% - 8px)',
                                left: '1rem',
                                transform: 'rotate(90deg)',
                                opacity: 0.7
                            },
                            'i-input': {
                                width: '100%'
                            },
                            'i-input > input': {
                                width: '100%',
                                height: 'auto !important',
                                padding: '1rem 1.5rem 1rem 2.25rem',
                                borderRadius: '0.5rem',
                                border: '2px solid #2a3675',
                                background: 'transparent',
                                color: '#FFFFFF',
                                fontSize: 'inherit',
                            }
                        }
                    },
                    '.token-header': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBlock: '0.5rem',
                        $nest: {
                            'i-label *': {
                                color: '#F15E61',
                                fontSize: '1rem',
                            },
                            '.token-section': {
                                position: 'relative',
                                cursor: 'pointer',
                            },
                            'i-icon': {
                                width: '10px',
                                height: '14px',
                                display: 'flex',
                                fill: '#FFFFFF',
                                position: 'absolute',
                                right: '0',
                            },
                            '.icon-sort-up': {
                                top: '2px',
                            },
                            '.icon-sort-down': {
                                bottom: '2px',
                            },
                            '.icon-sorted': {
                                fill: '#F15E61',
                            }
                        }
                    },
                    '.common-token': {
                        $nest: {
                            'i-grid-layout': {
                                margin: '0.5rem 0 0',
                                alignItems: 'center',
                                justifyContent: 'unset'
                            },
                            '.grid-item': {
                                padding: '0.35rem 0.5rem',
                                borderRadius: '1rem',
                                border: '2px solid transparent',
                                cursor: 'pointer',
                                $nest: {
                                    '&:hover': {
                                        borderColor: '#F15E61'
                                    },
                                    'i-image': {
                                        marginRight: '0.5rem'
                                    },
                                    'i-label': {
                                        overflow: 'hidden'
                                    },
                                }
                            },
                        }
                    },
                    '.token-list': {
                        margin: '0.5rem -0.5rem',
                        maxHeight: '45vh',
                        overflowY: 'auto',
                        $nest: {
                            '.token-info': {
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '1rem',
                                marginRight: '0.5rem',
                                textAlign: 'left'
                            },
                            '.token-item': {
                                padding: '0.5rem',
                                overflow: 'unset',
                                $nest: {
                                    '&:hover': {
                                        background: 'linear-gradient(254.8deg,rgba(231,91,102,.1) -8.08%,rgba(181,32,130,.1) 84.35%) !important'
                                    },
                                    'i-image': {
                                        marginRight: '0.5rem'
                                    },
                                    '&:not(:first-child)': {
                                        marginTop: 0
                                    },
                                    'i-label': {
                                        color: '#FFFFFF'
                                    }
                                }
                            },
                            '.token-name i-label > *': {
                                fontSize: '0.75rem',
                                marginRight: '0.5rem',
                                color: '#f50057'
                            }
                        }
                    }
                }
            },
            '@media screen and (max-width: 425px)': {
                $nest: {
                    '.common-list': {
                        gridTemplateColumns: 'repeat(3, 1fr) !important',
                    }
                }
            }
        }
    });
});
define("@staking/main/panelConfig/token-selection/importToken.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/store"], function (require, exports, components_5, eth_wallet_2, store_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImportToken = void 0;
    ;
    let ImportToken = class ImportToken extends components_5.Module {
        constructor(parent, options) {
            super(parent, options);
            this._state = {
                address: '',
                name: ''
            };
            this.$eventBus = components_5.application.EventBus;
        }
        ;
        set token(value) {
            this._token = value;
            this.updateState();
        }
        get token() {
            return this._token;
        }
        updateState() {
            this._state.address = this.token.address || '';
            this._state.name = this.token.name || '';
        }
        closeModal() {
            this.importModal.visible = false;
        }
        showModal() {
            this.importModal.visible = true;
        }
        async onImportToken(source, event) {
            event.stopPropagation();
            const tokenObj = this.token;
            store_2.addUserTokens(tokenObj);
            store_2.setTokenMap();
            await store_2.setTokenBalances();
            this.$eventBus.dispatch("emitNewToken" /* EmitNewToken */, tokenObj);
            if (typeof this.onUpdate === 'function') {
                this.onUpdate(tokenObj);
            }
            this.closeModal();
        }
        onHandleCheck(source, event) {
            this.importBtn.enabled = source.checked;
        }
        viewContract() {
            const chainId = eth_wallet_2.Wallet.getInstance().chainId;
            store_2.viewOnExplorerByAddress(chainId, this._state.address);
        }
        async init() {
            super.init();
            this.importModal.onClose = () => {
                this.tokenAgreeCheckBox.checked = false;
                this.importBtn.enabled = false;
            };
        }
        render() {
            return (this.$render("i-modal", { id: "importModal", class: "bg-modal", title: "Select Token", closeIcon: { name: 'times' } },
                this.$render("i-panel", { class: "pnl-token-import" },
                    this.$render("i-panel", null,
                        this.$render("i-icon", { name: "question", class: "cicrle", fill: "#e83e8c", width: 15, height: 15, margin: { right: 3 } }),
                        this.$render("i-label", { caption: this._state.name })),
                    this.$render("i-hstack", { margin: { top: 5, bottom: 5 } },
                        this.$render("i-label", { caption: this._state.address, font: { color: '#1890ff' }, class: "pointer", onClick: () => this.viewContract() })),
                    this.$render("i-panel", { class: "btn-source-panel" },
                        this.$render("i-icon", { name: "exclamation-triangle", margin: { right: 3 }, fill: "#fff", width: 15, height: 15 }),
                        this.$render("i-label", { caption: "Unknow Source" }))),
                this.$render("i-panel", { class: "pnl-token-import" },
                    this.$render("i-hstack", { horizontalAlignment: "center", margin: { bottom: 5 } },
                        this.$render("i-icon", { name: "exclamation-triangle", margin: { right: 3 }, fill: "#e83e8c", width: 30, height: 30 })),
                    this.$render("i-hstack", { horizontalAlignment: "center", class: "text-center", margin: { bottom: 5 } },
                        this.$render("i-label", { font: { bold: true, color: "#fff" }, caption: "Trade at your own risk!" })),
                    this.$render("i-hstack", { horizontalAlignment: "center", class: "text-center", margin: { bottom: 5 } },
                        this.$render("i-label", { font: { color: "#fff" }, caption: "Anyone can create a token, including creating fake versions of existing token that claims tp represent projects" })),
                    this.$render("i-hstack", { horizontalAlignment: "center", class: "text-center", margin: { bottom: 5 } },
                        this.$render("i-label", { width: 300, font: { bold: true, color: "#fff" }, caption: "If you purchased this token, you may not be to able sell it back" })),
                    this.$render("i-hstack", { horizontalAlignment: "center", class: "text-center" },
                        this.$render("i-checkbox", { id: "tokenAgreeCheckBox", width: "200", margin: { top: 30 }, height: 30, class: "token-agree-input", background: { color: 'transparent' }, caption: "I understand", onChanged: this.onHandleCheck.bind(this) }))),
                this.$render("i-button", { id: "importBtn", class: "btn-import", width: "100%", caption: "Import", height: 40, enabled: false, onClick: this.onImportToken.bind(this) })));
        }
    };
    __decorate([
        components_5.observable()
    ], ImportToken.prototype, "_state", void 0);
    ImportToken = __decorate([
        components_5.customElements('import-token')
    ], ImportToken);
    exports.ImportToken = ImportToken;
});
define("@staking/main/panelConfig/token-selection/tokenSelection.tsx", ["require", "exports", "@ijstech/components", "@staking/store", "@staking/global", "@staking/assets", "@staking/main/panelConfig/token-selection/tokenSelection.css.ts"], function (require, exports, components_6, store_3, global_2, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenSelection = void 0;
    ;
    let TokenSelection = class TokenSelection extends components_6.Module {
        constructor(parent, options) {
            super(parent, options);
            this._isSortBalanceShown = true;
            this._isBtnMaxShown = false;
            this.isInitialized = false;
            this.sortToken = (a, b, asc) => {
                if (a.balance != b.balance) {
                    return asc ? (a.balance - b.balance) : (b.balance - a.balance);
                }
                if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) {
                    return -1;
                }
                if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) {
                    return 1;
                }
                return 0;
            };
            this.$eventBus = components_6.application.EventBus;
            this.registerEvent();
        }
        get token() {
            return this._token;
        }
        set token(value) {
            this._token = value;
            this.updateButton(value);
        }
        get targetChainId() {
            return this._targetChainId;
        }
        set targetChainId(value) {
            this._targetChainId = value;
            this.updateDataByChain(true);
        }
        get tokenDataListProp() {
            return this._tokenDataListProp;
        }
        set tokenDataListProp(value) {
            this._tokenDataListProp = value;
            this.renderTokenItems();
            this.updateButton();
        }
        get onSelectToken() {
            return this._onSelectToken;
        }
        set onSelectToken(callback) {
            this._onSelectToken = callback;
        }
        get isCommonShown() {
            return this._isCommonShown;
        }
        set isCommonShown(value) {
            this._isCommonShown = value;
            this.renderCommonItems();
        }
        get isSortBalanceShown() {
            return this._isSortBalanceShown;
        }
        set isSortBalanceShown(value) {
            this._isSortBalanceShown = value;
            this.sortBalancePanel.visible = value;
        }
        get isBtnMaxShown() {
            return this._isBtnMaxShown;
        }
        set isBtnMaxShown(value) {
            this._isBtnMaxShown = value;
            if (!this.btnMax)
                return;
            if (value) {
                this.btnMax.visible = true;
            }
            else {
                this.btnMax.visible = false;
            }
        }
        get onSetMaxBalance() {
            return this._onSetMaxBalance;
        }
        set onSetMaxBalance(callback) {
            this._onSetMaxBalance = callback;
        }
        get chainId() {
            if (this.targetChainId) {
                return this.targetChainId;
            }
            return store_3.isWalletConnected() ? this.currentChainId : store_3.getChainId();
        }
        get disableSelect() {
            return this._disableSelect;
        }
        set disableSelect(value) {
            this._disableSelect = value;
            this.btnToken.enabled = !value;
            // this.btnToken.rightIcon.name = value ? '' : 'caret-down';
            this.btnToken.rightIcon.visible = !value;
        }
        get disabledMaxBtn() {
            return this._disabledMaxBtn;
        }
        set disabledMaxBtn(value) {
            this._disabledMaxBtn = value;
            this.btnMax.enabled = !value;
        }
        async initData() {
            if (!this.chainId) {
                this.currentChainId = store_3.getChainId();
            }
            if (store_3.isWalletConnected()) {
                this.tokenBalancesMap = store_3.getTokenBalances();
            }
            this.renderTokenItems();
        }
        async updateDataByChain(init) {
            this.tokenBalancesMap = await store_3.updateAllTokenBalances();
            this.renderTokenItems();
            this.updateButton(init ? undefined : this.token);
            if (init) {
                this.isInitialized = true;
            }
        }
        async updateDataByNewToken() {
            this.tokenBalancesMap = store_3.getTokenBalances();
            this.renderTokenItems();
        }
        async onChainChange() {
            if (!this.targetChainId) {
                this.currentChainId = store_3.getChainId();
                this.updateDataByChain();
            }
        }
        async onWalletConnect() {
            this.checkHasMetaMask = store_3.hasMetaMask();
            await this.initData();
            this.updateStatusButton();
        }
        async onWalletDisconnect() {
            await this.initData();
        }
        async onPaid() {
            await this.updateDataByChain();
            await this.initData();
        }
        registerEvent() {
            this.$eventBus.register(this, "isWalletConnected" /* IsWalletConnected */, this.onWalletConnect);
            this.$eventBus.register(this, "IsWalletDisconnected" /* IsWalletDisconnected */, this.onWalletDisconnect);
            this.$eventBus.register(this, "chainChanged" /* chainChanged */, this.onChainChange);
            this.$eventBus.register(this, "Paid" /* Paid */, this.onPaid);
            this.$eventBus.register(this, "emitNewToken" /* EmitNewToken */, this.updateDataByNewToken);
        }
        get tokenDataList() {
            if (this.tokenDataListProp && this.tokenDataListProp.length) {
                return this.tokenDataListProp;
            }
            const tokenList = store_3.getTokenList(this.chainId).filter(f => f.address);
            return tokenList.map((token) => {
                var _a;
                const tokenObject = Object.assign({}, token);
                const nativeToken = store_3.ChainNativeTokenByChainId[this.chainId];
                if (token.symbol === nativeToken.symbol) {
                    Object.assign(tokenObject, { isNative: true });
                }
                if (!store_3.isWalletConnected()) {
                    Object.assign(tokenObject, {
                        balance: 0,
                    });
                }
                else if (this.tokenBalancesMap) {
                    Object.assign(tokenObject, {
                        balance: this.tokenBalancesMap[((_a = token.address) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || token.symbol] || 0,
                    });
                }
                return tokenObject;
            }).sort(this.sortToken);
        }
        get commonTokenDataList() {
            const tokenList = this.tokenDataList;
            if (!tokenList)
                return [];
            return tokenList.filter((token) => token.isCommon || token.isNative);
        }
        get tokenDataListFiltered() {
            let tokenList = this.tokenDataList || [];
            if (tokenList.length) {
                if (this.filterValue) {
                    tokenList = tokenList.filter((token) => {
                        var _a;
                        return token.symbol.toUpperCase().includes(this.filterValue) ||
                            token.name.toUpperCase().includes(this.filterValue) ||
                            ((_a = token.address) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === this.filterValue;
                    });
                }
                if (this.sortValue !== undefined) {
                    tokenList = tokenList.sort((a, b) => {
                        return this.sortToken(a, b, this.sortValue);
                    });
                    const allBalanceZero = !tokenList.some((token) => token.balance && token.balance !== '0');
                    if (allBalanceZero && !this.sortValue) {
                        tokenList = tokenList.reverse();
                    }
                }
            }
            return tokenList;
        }
        sortBalance() {
            this.sortValue = !this.sortValue;
            if (this.sortValue) {
                this.iconSortUp.classList.add('icon-sorted');
                this.iconSortDown.classList.remove('icon-sorted');
            }
            else {
                this.iconSortUp.classList.remove('icon-sorted');
                this.iconSortDown.classList.add('icon-sorted');
            }
            this.renderTokenItems();
        }
        filterSearch(source) {
            this.filterValue = source.value.toUpperCase();
            this.renderTokenItems();
        }
        async renderCommonItems() {
            if (!this.commonTokenList)
                return;
            this.commonTokenList.innerHTML = '';
            if (this.isCommonShown && this.commonTokenDataList) {
                this.commonTokenPanel.visible = true;
                this.commonTokenDataList.forEach((token) => {
                    const logoAddress = token.address && !this.targetChainId ? store_3.getTokenIcon(token.address) : assets_1.default.fullPath(store_3.getTokenIconPath(token, this.chainId));
                    this.commonTokenList.appendChild(this.$render("i-hstack", { background: { color: "var(--background-default)" }, onClick: () => this.onSelect(token), tooltip: { content: token.name }, verticalAlignment: "center", class: "grid-item" },
                        this.$render("i-image", { width: 24, height: 24, url: logoAddress, fallbackUrl: store_3.fallBackUrl }),
                        this.$render("i-label", { caption: token.symbol, onClick: () => this.onSelect(token) })));
                });
            }
            else {
                this.commonTokenPanel.visible = false;
            }
        }
        renderToken(token) {
            const logoAddress = token.address && !this.targetChainId ? store_3.getTokenIcon(token.address) : assets_1.default.fullPath(store_3.getTokenIconPath(token, this.chainId));
            return (this.$render("i-hstack", { width: "100%", verticalAlignment: "center", class: "token-item", padding: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' }, onClick: () => this.onSelect(token) },
                this.$render("i-vstack", { width: "100%" },
                    this.$render("i-hstack", null,
                        this.$render("i-hstack", null,
                            this.$render("i-image", { width: 36, height: 36, url: logoAddress, fallbackUrl: store_3.fallBackUrl }),
                            this.$render("i-panel", { class: "token-info" },
                                this.$render("i-label", { caption: token.symbol, onClick: () => this.onSelect(token) }),
                                this.$render("i-hstack", { class: "token-name", verticalAlignment: "center" },
                                    this.$render("i-label", { caption: token.name, onClick: () => this.onSelect(token) }),
                                    token.address && !token.isNative ?
                                        this.$render("i-icon", { name: "copy", width: "14px", height: "14px", fill: '#FFFFFF', margin: { right: 8 }, tooltip: { content: `${token.symbol} has been copied`, trigger: 'click' }, onClick: () => components_6.application.copyToClipboard(token.address || ''), class: "inline-flex pointer" })
                                        : [],
                                    token.address && this.checkHasMetaMask ?
                                        this.$render("i-image", { display: "flex", width: 16, height: 16, url: assets_1.default.fullPath('img/swap/metamask.png'), tooltip: { content: 'Add to MetaMask' }, onClick: (target, event) => this.addToMetamask(event, token) })
                                        : []))),
                        this.$render("i-label", { class: "ml-auto", caption: global_2.formatNumber(token.balance, 4), onClick: () => this.onSelect(token) })),
                    token.isNew ? (this.$render("i-hstack", { horizontalAlignment: "center" },
                        this.$render("i-button", { caption: 'Import', class: "btn-import", margin: { top: 10 }, height: 34, onClick: (source, event) => this.showImportTokenModal(event, token) }))) : (this.$render("i-hstack", null)))));
        }
        async renderTokenItems() {
            if (!this.tokenList)
                return;
            this.renderCommonItems();
            this.tokenList.innerHTML = '';
            if (this.tokenDataListFiltered.length) {
                const tokenItems = this.tokenDataListFiltered.map((token) => this.renderToken(token));
                this.tokenList.append(...tokenItems);
            }
            else if (this.targetChainId && this.targetChainId !== store_3.getChainId()) {
                this.tokenList.innerHTML = '';
                this.tokenList.append(this.$render("i-label", { font: { color: '#FFFFFF' }, class: "text-center mt-1 mb-1", caption: "No tokens found" }));
            }
            else {
                try {
                    const tokenObj = await store_3.getTokenObject(this.filterValue, true);
                    if (!tokenObj)
                        throw new Error('Token is invalid');
                    this.tokenList.innerHTML = '';
                    this.tokenList.appendChild(this.renderToken(Object.assign(Object.assign({}, tokenObj), { isNew: true })));
                }
                catch (err) {
                    this.tokenList.innerHTML = '';
                    this.tokenList.append(this.$render("i-label", { font: { color: '#FFFFFF' }, class: "text-center mt-1 mb-1", caption: "No tokens found" }));
                }
            }
        }
        addToMetamask(event, token) {
            event.stopPropagation();
            const img = `${window.location.origin}${store_3.getTokenIconPath(token, this.chainId).substring(1)}`;
            window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: token.address,
                        symbol: token.symbol,
                        decimals: token.decimals,
                        image: img
                    },
                },
            });
        }
        async showModal() {
            if (!this.enabled)
                return;
            this.tokenSearch.value = '';
            this.filterValue = '';
            this.sortValue = undefined;
            this.iconSortUp.classList.remove('icon-sorted');
            this.iconSortDown.classList.remove('icon-sorted');
            if (!this.tokenList.innerHTML) {
                await this.initData();
            }
            this.tokenSelectionModal.visible = true;
        }
        updateStatusButton() {
            const status = store_3.isWalletConnected();
            if (this.btnToken) {
                this.btnToken.enabled = !this.disableSelect && status;
            }
            if (this.btnMax) {
                this.btnMax.enabled = !this.disabledMaxBtn && status;
            }
        }
        updateButton(token) {
            var _a;
            const btnToken = this.btnToken;
            if (!btnToken)
                return;
            try {
                let image = btnToken.querySelector('i-image');
                token = (_a = this.tokenDataList) === null || _a === void 0 ? void 0 : _a.find((v) => { var _a; return (v.address && v.address == ((_a = this.token) === null || _a === void 0 ? void 0 : _a.address)); });
                if (!token) {
                    btnToken.caption = 'Select a token';
                    btnToken.classList.remove('has-token');
                    this.btnMax.visible = false;
                    if (image) {
                        btnToken.removeChild(image);
                    }
                }
                else {
                    btnToken.caption = token.symbol;
                    btnToken.classList.add('has-token');
                    if (this.isBtnMaxShown) {
                        this.btnMax.visible = true;
                    }
                    const logoAddress = token.address && !this.targetChainId ? store_3.getTokenIcon(token.address) : assets_1.default.fullPath(store_3.getTokenIconPath(token, this.chainId));
                    if (!image) {
                        image = new components_6.Image(btnToken, {
                            width: 20,
                            height: 20,
                            fallbackUrl: store_3.fallBackUrl
                        });
                        btnToken.prepend(image);
                    }
                    image.url = logoAddress;
                }
            }
            catch (_b) { }
        }
        async onSelect(token, isNew = false) {
            this.token = token;
            // The token has been not imported
            if (!isNew && token.isNew && !store_3.hasUserToken(token.address || '', this.chainId)) {
                store_3.setUserTokens(token, this.chainId);
                store_3.setTokenMap();
                await store_3.setTokenBalances();
                this.$eventBus.dispatch("emitNewToken" /* EmitNewToken */, token);
                isNew = true;
            }
            this.onSelectToken(Object.assign(Object.assign({}, token), { isNew }));
            this.tokenSelectionModal.visible = false;
        }
        ;
        async init() {
            await this.onWalletConnect();
            super.init();
            this.disableSelect = this.getAttribute("disableSelect", true);
            this.disabledMaxBtn = this.getAttribute("disabledMaxBtn", true);
            this.updateStatusButton();
            this.updateButton();
            if (!store_3.isWalletConnected())
                this.disableSelect = false;
        }
        showImportTokenModal(event, token) {
            event.stopPropagation();
            this.importTokenModal.token = token;
            this.importTokenModal.showModal();
            this.importTokenModal.onUpdate = this.onImportToken.bind(this);
        }
        onImportToken(token) {
            this.onSelect(token, true);
        }
        onCloseModal() {
            // reset list
            this.filterValue = '';
            this.renderTokenItems();
        }
        render() {
            return (this.$render("i-panel", { class: "token-selection" },
                this.$render("i-panel", { class: "flex" },
                    this.$render("i-button", { id: "btnMax", visible: false, enabled: false, class: "custom-btn", caption: "Max", onClick: () => this.onSetMaxBalance() }),
                    this.$render("i-button", { id: "btnToken", enabled: false, class: "custom-btn", rightIcon: { name: "caret-down", fill: '#F15E61' }, caption: "Select a token", onClick: () => this.showModal() })),
                this.$render("i-modal", { id: "tokenSelectionModal", class: "bg-modal", title: "Select Token", closeIcon: { name: 'times' }, onClose: () => this.onCloseModal() },
                    this.$render("i-panel", { class: "search" },
                        this.$render("i-icon", { width: 16, height: 16, name: "search", fill: "white" }),
                        this.$render("i-input", { id: "tokenSearch", placeholder: "Search name or paste address", width: "100%", height: "auto", onKeyUp: this.filterSearch.bind(this) })),
                    this.$render("i-panel", { id: "commonTokenPanel", class: "common-token" },
                        this.$render("i-label", { caption: "Common Token" }),
                        this.$render("i-grid-layout", { id: "commonTokenList", columnsPerRow: 4, gap: { row: '1rem', column: '1rem' }, class: "common-list", verticalAlignment: "center" })),
                    this.$render("i-panel", { id: "sortBalancePanel", class: "token-header" },
                        this.$render("i-label", { caption: "Token" }),
                        this.$render("i-panel", { class: "token-section ml-auto", onClick: () => this.sortBalance() },
                            this.$render("i-label", { class: "mr-1", caption: "Balance" }),
                            this.$render("i-icon", { id: "iconSortUp", class: "icon-sort-up", name: "sort-up" }),
                            this.$render("i-icon", { id: "iconSortDown", class: "icon-sort-down", name: "sort-down" }))),
                    this.$render("i-grid-layout", { id: "tokenList", class: "token-list", columnsPerRow: 1 })),
                this.$render("import-token", { id: "importTokenModal" })));
        }
    };
    __decorate([
        components_6.observable()
    ], TokenSelection.prototype, "sortValue", void 0);
    __decorate([
        components_6.observable()
    ], TokenSelection.prototype, "filterValue", void 0);
    TokenSelection = __decorate([
        components_6.customElements('token-selection')
    ], TokenSelection);
    exports.TokenSelection = TokenSelection;
    ;
});
define("@staking/main/panelConfig/token-selection/index.tsx", ["require", "exports", "@staking/main/panelConfig/token-selection/tokenSelection.tsx", "@staking/main/panelConfig/token-selection/importToken.tsx"], function (require, exports, tokenSelection_1, importToken_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImportToken = exports.TokenSelection = void 0;
    Object.defineProperty(exports, "TokenSelection", { enumerable: true, get: function () { return tokenSelection_1.TokenSelection; } });
    Object.defineProperty(exports, "ImportToken", { enumerable: true, get: function () { return importToken_1.ImportToken; } });
});
define("@staking/main/panelConfig/reward.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/main/panelConfig/token-selection/index.tsx"], function (require, exports, components_7, eth_wallet_3, global_3, store_4, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RewardConfig = void 0;
    ;
    let RewardConfig = class RewardConfig extends components_7.Module {
        constructor(parent, options) {
            super(parent, options);
            this._campaignEndLockTime = 0;
            this._maxTotal = 0;
            this.isInitialized = false;
            this.unit = 1;
            this.hourVal = 60 * 60;
            this.units = [
                {
                    name: 'Hour(s)',
                    value: 1
                },
                {
                    name: 'Day(s)',
                    value: 24
                },
                {
                    name: 'Week(s)',
                    value: 7 * 24
                },
            ];
            this.setupInput = () => {
                if (this.wrapperAddressElm) {
                    this.wrapperAddressElm.visible = !this.isNew;
                    this.inputAddress.enabled = this.isNew;
                    this.wrapperRewardNeededElm.visible = this.isNew;
                    this.inputMultiplier.enabled = this.isNew;
                    this.inputInitialReward.enabled = this.isNew;
                    this.inputRewardVesting.enabled = this.isNew;
                    this.inputAdminClaimDeadline.enabled = this.isNew;
                    if (this.tokenSelection) {
                        this.tokenSelection.enabled = this.isNew;
                    }
                    if (this.btnTime) {
                        this.btnTime.enabled = this.isNew;
                    }
                    this.checkboxStartDate.enabled = this.isNew;
                    this.inputVestingStartDate.enabled = this.isNew;
                    if (!this.isNew) {
                        this.inputAdminClaimDeadline.classList.add('input-disabled');
                        this.checkboxStartDate.classList.add('input-disabled');
                        this.inputVestingStartDate.classList.add('input-disabled');
                    }
                }
            };
            this.setupData = async () => {
                if (this.data) {
                    const { address, rewardTokenAddress, multiplier, initialReward, vestingPeriod, claimDeadline, admin, isCommonStartDate, vestingStartDate } = this.data;
                    const interval = setInterval(() => {
                        if (this.isInitialized && this.tokenSelection.isInitialized) {
                            clearInterval(interval);
                            const tokenMap = store_4.getTokenMapData(this.chainId);
                            const token = tokenMap[rewardTokenAddress] || tokenMap[rewardTokenAddress === null || rewardTokenAddress === void 0 ? void 0 : rewardTokenAddress.toLowerCase()];
                            this.inputAddress.value = address;
                            this.isAddressValid = true;
                            this.token = token;
                            this.tokenSelection.token = token;
                            this.inputMultiplier.value = new eth_wallet_3.BigNumber(multiplier).toFixed();
                            this.inputInitialReward.value = new eth_wallet_3.BigNumber(initialReward).toFixed();
                            this.inputRewardVesting.value = new eth_wallet_3.BigNumber(vestingPeriod).dividedBy(this.hourVal).toFixed();
                            this.setAdminClaimDeadline(claimDeadline);
                            this.checkboxStartDate.checked = !!isCommonStartDate;
                            this.onCheckCommonStartDate();
                            if (isCommonStartDate) {
                                this.setStartDate(vestingStartDate);
                            }
                            this.updateMaxReward();
                            this.updateRate();
                            this.emitInput();
                        }
                    }, 200);
                }
            };
            this.updateMaxReward = () => {
                if (!this.lbMaxReward)
                    return;
                if (this.token) {
                    this.lbMaxReward.caption = `${global_3.formatNumber(this.maxReward)} ${this.token.symbol || ''}`;
                }
                else {
                    this.lbMaxReward.caption = '-';
                }
            };
            this.updateRate = () => {
                if (!this.lbRate || !this.inputMultiplier)
                    return;
                if (this.stakingToken && this.token && this.inputMultiplier.value) {
                    this.lbRate.caption = `<span class="mr-0-5">1 ${this.stakingToken.symbol}</span> : <span class="ml-0-5">${this.inputMultiplier.value} ${this.token.symbol}</span>`;
                }
                else {
                    this.lbRate.caption = '-';
                }
            };
            this.renderTimeButton = async () => {
                const vstack = await components_7.VStack.create({ gap: 8 });
                const dropdownModal = await components_7.Modal.create({
                    showBackdrop: false,
                    maxWidth: 80,
                    minWidth: 'auto',
                    popupPlacement: 'bottom'
                });
                this.btnTime = await components_7.Button.create({
                    caption: 'Hour(s)',
                    background: { color: '#0C1234' },
                    font: { color: '#FFFFFF' },
                    border: { style: 'none', radius: 12 },
                    padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
                    rightIcon: { name: 'caret-down', fill: '#F15E61' },
                    width: '100%',
                    height: 40,
                    maxWidth: 80,
                });
                this.btnTime.classList.add('btn-select');
                this.btnTime.onClick = () => { dropdownModal.visible = !dropdownModal.visible; };
                for (const unit of this.units) {
                    const dropdownItem = await components_7.Button.create({
                        caption: unit.name,
                        background: { color: 'transparent' },
                        height: 36,
                    });
                    dropdownItem.onClick = () => {
                        dropdownModal.visible = false;
                        if (this.unit === unit.value)
                            return;
                        this.btnTime.caption = unit.name;
                        this.unit = unit.value;
                    };
                    vstack.appendChild(dropdownItem);
                }
                dropdownModal.item = vstack;
                this.pnlTimeSelection.clearInnerHTML();
                this.pnlTimeSelection.appendChild(this.btnTime);
                this.pnlTimeSelection.appendChild(dropdownModal);
            };
            this.checkStartDate = () => {
                if (!this.inputVestingStartDate)
                    return;
                const startDateElm = this.inputVestingStartDate.querySelector('input[type="datetime-local"]');
                if (startDateElm) {
                    const minDate = components_7.moment.unix(this.campaignEndLockTime);
                    const val = minDate.add(60, 'seconds');
                    if (this.campaignEndLockTime) {
                        startDateElm.min = val.format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (this.vestingStartDate && this.vestingStartDate <= this.campaignEndLockTime) {
                        this.lbStartDateErr.visible = true;
                        this.lbStartDateErr.caption = `The start date should be greater than <b>${val.format(global_3.DefaultDateTimeFormat)}</b>`;
                    }
                    else {
                        this.lbStartDateErr.visible = false;
                    }
                }
            };
            this.setStartDate = (value) => {
                const startDate = new eth_wallet_3.BigNumber(value || 0).toNumber();
                this.vestingStartDate = startDate;
                const startTextElm = this.inputVestingStartDate.querySelector('input[type="text"]');
                if (startDate) {
                    startTextElm.value = components_7.moment.unix(startDate).format(global_3.DefaultDateTimeFormat);
                }
                this.emitInput();
            };
            this.setAdminClaimDeadline = (value) => {
                const date = new eth_wallet_3.BigNumber(value || components_7.moment('31/12/9999 23:59:59', global_3.DefaultDateTimeFormat).unix()).toNumber();
                this.adminClaimDeadline = date;
                const elm = this.inputAdminClaimDeadline.querySelector('input[type="text"]');
                if (date) {
                    elm.value = components_7.moment.unix(date).format(global_3.DefaultDateTimeFormat);
                }
                this.emitInput();
            };
            this.setAttrDatePicker = () => {
                this.inputVestingStartDate.dateTimeFormat = global_3.DefaultDateTimeFormat;
                this.inputAdminClaimDeadline.dateTimeFormat = global_3.DefaultDateTimeFormat;
                this.inputVestingStartDate.onChanged = (datepickerElm) => this.changeStartDate(datepickerElm.inputElm.value);
                this.inputAdminClaimDeadline.onChanged = (datepickerElm) => this.changeAdminClaimDeadline(datepickerElm.inputElm.value);
                const startTextElm = this.inputVestingStartDate.querySelector('input[type="text"]');
                if (startTextElm) {
                    startTextElm.placeholder = global_3.DefaultDateTimeFormat;
                }
                const adminTextElm = this.inputAdminClaimDeadline.querySelector('input[type="text"]');
                if (adminTextElm) {
                    adminTextElm.placeholder = global_3.DefaultDateTimeFormat;
                }
                const adminDateElm = this.inputAdminClaimDeadline.querySelector('input[type="datetime-local"]');
                if (adminDateElm) {
                    adminDateElm.min = components_7.moment().add(300, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                }
                this.setAdminClaimDeadline(components_7.moment('31/12/9999 23:59:59', global_3.DefaultDateTimeFormat).unix());
                this.checkStartDate();
            };
            this.changeStartDate = (value) => {
                const date = components_7.moment(value, global_3.DefaultDateTimeFormat);
                this.vestingStartDate = date.unix();
                if (this.vestingStartDate <= this.campaignEndLockTime) {
                    const minDate = components_7.moment.unix(this.campaignEndLockTime).add(60, 'seconds');
                    this.lbStartDateErr.visible = true;
                    this.lbStartDateErr.caption = `The start date should be greater than <b>${minDate.format(global_3.DefaultDateTimeFormat)}</b>`;
                }
                else {
                    this.lbStartDateErr.visible = false;
                }
                this.emitInput();
            };
            this.changeAdminClaimDeadline = (value) => {
                const date = components_7.moment(value, global_3.DefaultDateTimeFormat);
                this.adminClaimDeadline = date.unix();
                const minDate = components_7.moment().add(300, 'seconds');
                if (this.adminClaimDeadline <= minDate.unix() && this.isNew) {
                    this.lbErrAdminClaimDeadline.visible = true;
                    this.lbErrAdminClaimDeadline.caption = `The admin claim deadline should be greater than <b>${minDate.format(global_3.DefaultDateTimeFormat)}</b>`;
                }
                else {
                    this.lbErrAdminClaimDeadline.visible = false;
                }
                this.emitInput();
            };
            this.emitInput = () => {
                components_7.application.EventBus.dispatch("emitInput" /* EmitInput */);
            };
            this.onCheckCommonStartDate = (isClicked) => {
                if (isClicked && !this.checkboxStartDate.enabled) {
                    this.checkboxStartDate.checked = !this.checkboxStartDate.checked;
                    return;
                }
                this.wrapperStartDateElm.visible = this.checkboxStartDate.checked;
                this.emitInput();
            };
            this.onInputToken = (token) => {
                this.token = token;
                this.updateMaxReward();
                this.updateRate();
                this.emitInput();
            };
            this.onInputMultiplier = (input) => {
                global_3.limitInputNumber(input, 18);
                this.updateMaxReward();
                this.updateRate();
                this.emitInput();
            };
            this.checkInitialReward = () => {
                const initialReward = Number(this.inputInitialReward.value);
                if (isNaN(initialReward))
                    return false;
                return initialReward >= 0 && initialReward <= 1;
            };
            this.onInputInitalReward = (input) => {
                const _value = input.value;
                if (global_3.isInvalidInput(_value)) {
                    this.inputInitialReward.value = '0';
                }
                if (!this.checkInitialReward()) {
                    this.lbErrInitialReward.visible = true;
                    this.lbErrInitialReward.caption = 'The upfront reward ratio must be between 0 and 1';
                }
                else {
                    this.lbErrInitialReward.visible = false;
                }
                this.emitInput();
            };
            this.onInputUnix = (input) => {
                const _input = input;
                let value = _input.value;
                value = value.replace(/[^0-9]+/g, "");
                _input.value = value;
                this.emitInput();
            };
            this.onInputAddress = async () => {
                this.isAddressValid = await global_3.isAddressValid(this.inputAddress.value);
                this.lbAddressErr.visible = !this.isAddressValid;
                this.emitInput();
            };
            this.checkValidation = () => {
                return this.token &&
                    this.checkInitialReward() &&
                    global_3.isValidNumber(this.inputMultiplier.value) &&
                    global_3.isValidNumber(this.inputRewardVesting.value) &&
                    (!this.isNew || (this.adminClaimDeadline && this.adminClaimDeadline > components_7.moment().unix())) &&
                    (!this.checkboxStartDate.checked || (this.checkboxStartDate.checked && (!this.campaignEndLockTime || this.vestingStartDate > this.campaignEndLockTime))) &&
                    (this.isNew || this.isAddressValid);
            };
            this.getData = () => {
                var _a;
                const reward = {
                    address: this.inputAddress.value,
                    rewardTokenAddress: ((_a = this.token) === null || _a === void 0 ? void 0 : _a.address) || '',
                    multiplier: new eth_wallet_3.BigNumber(this.inputMultiplier.value),
                    initialReward: new eth_wallet_3.BigNumber(this.inputInitialReward.value),
                    vestingPeriod: new eth_wallet_3.BigNumber(this.inputRewardVesting.value).multipliedBy(this.unit).multipliedBy(this.hourVal),
                    claimDeadline: new eth_wallet_3.BigNumber(this.adminClaimDeadline),
                    admin: '',
                    isCommonStartDate: this.checkboxStartDate.checked,
                    vestingStartDate: new eth_wallet_3.BigNumber(this.vestingStartDate || 0),
                    rewardAmount: this.maxReward
                };
                return reward;
            };
        }
        set chainId(chainId) {
            this._chainId = chainId;
            this.tokenSelection.token = undefined;
            this.token = undefined;
            this.tokenSelection.targetChainId = chainId;
        }
        get chainId() {
            return this._chainId || store_4.getChainId() || store_4.getDefaultChainId();
        }
        set isNew(value) {
            this._isNew = value;
            this.setupInput();
        }
        get isNew() {
            return this._isNew;
        }
        set data(value) {
            this._data = value;
            this.setupData();
        }
        get data() {
            return this._data;
        }
        set campaignEndLockTime(value) {
            this._campaignEndLockTime = value;
            this.checkStartDate();
        }
        get campaignEndLockTime() {
            return this._campaignEndLockTime;
        }
        set maxTotal(value) {
            this._maxTotal = value;
            this.updateMaxReward();
        }
        get maxTotal() {
            return this._maxTotal || 0;
        }
        set stakingToken(token) {
            this._stakingToken = token;
            this.updateRate();
        }
        get stakingToken() {
            return this._stakingToken;
        }
        get maxReward() {
            return new eth_wallet_3.BigNumber(this.inputMultiplier.value || 0).multipliedBy(this.maxTotal);
        }
        get rate() {
            return new eth_wallet_3.BigNumber(this.inputMultiplier.value || 0).multipliedBy(this.maxTotal);
        }
        async init() {
            super.init();
            this.tokenSelection = new index_1.TokenSelection();
            this.tokenSelection.onSelectToken = this.onInputToken;
            this.pnlTokenSelection.appendChild(this.tokenSelection);
            this.setAttrDatePicker();
            await this.renderTimeButton();
            this.setupInput();
            this.isInitialized = true;
        }
        render() {
            return (this.$render("i-panel", { class: "custom-scroll" },
                this.$render("i-vstack", { gap: 10, verticalAlignment: "center", class: "main-content" },
                    this.$render("i-hstack", { id: "wrapperAddressElm", gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Address" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, class: "w-input", verticalAlignment: "center" },
                            this.$render("i-input", { id: "inputAddress", class: "input-text w-input w-100", onChanged: this.onInputAddress }),
                            this.$render("i-label", { id: "lbAddressErr", visible: false, caption: "The address is invalid!", font: { color: '#F15E61', size: '12px' } }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Reward Token Address" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-panel", { id: "pnlTokenSelection", class: "w-input" })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Reward Factor" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-input", { id: "inputMultiplier", inputType: "number", class: "input-text w-input", onChanged: (src) => this.onInputMultiplier(src) })),
                    this.$render("i-hstack", { gap: 10, margin: { bottom: 8, top: 8 }, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Rate" }),
                            this.$render("i-label", { font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, class: "w-input", verticalAlignment: "center" },
                            this.$render("i-label", { id: "lbRate", caption: "-", class: "lb-title w-100", font: { color: '#f6c958' } }))),
                    this.$render("i-hstack", { id: "wrapperRewardNeededElm", visible: false, gap: 10, margin: { bottom: 8 }, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Reward Needed" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, class: "w-input", verticalAlignment: "center" },
                            this.$render("i-label", { id: "lbMaxReward", caption: "-", class: "lb-title w-100", font: { color: '#f6c958' } }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Upfront Reward Ratio" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, verticalAlignment: "center", class: "w-input", position: "relative" },
                            this.$render("i-input", { id: "inputInitialReward", placeholder: "0 <= Reward Ratio <= 1", inputType: "number", class: "input-text w-input", onChanged: (src) => this.onInputInitalReward(src) }),
                            this.$render("i-label", { id: "lbErrInitialReward", visible: false, font: { color: '#F15E61', size: '12px' } }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Reward Vesting" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-hstack", { gap: 4, class: "w-input", verticalAlignment: "center", wrap: "nowrap" },
                            this.$render("i-input", { id: "inputRewardVesting", inputType: "number", width: 216, class: "input-text", onChanged: (src) => this.onInputUnix(src) }),
                            this.$render("i-panel", { id: "pnlTimeSelection", class: "network-selection", width: 80 }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Admin Claim Deadline" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, verticalAlignment: "center", class: "w-input", position: "relative" },
                            this.$render("i-datepicker", { id: "inputAdminClaimDeadline", width: "100%", height: 40, type: "dateTime", class: "cs-datepicker" }),
                            this.$render("i-label", { id: "lbErrAdminClaimDeadline", visible: false, font: { color: '#F15E61', size: '12px' } }))),
                    this.$render("i-hstack", { class: "row-mobile", gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-label", { class: "lb-title", caption: "Common Start Date" }),
                        this.$render("i-vstack", { verticalAlignment: "center", horizontalAlignment: "start", class: "w-input" },
                            this.$render("i-checkbox", { id: "checkboxStartDate", height: "auto", checked: false, onChanged: () => this.onCheckCommonStartDate(true) }))),
                    this.$render("i-hstack", { id: "wrapperStartDateElm", visible: false, gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Vesting Start Date" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, verticalAlignment: "center", class: "w-input", position: "relative" },
                            this.$render("i-datepicker", { id: "inputVestingStartDate", width: "100%", height: 40, type: "dateTime", class: "cs-datepicker" }),
                            this.$render("i-label", { id: "lbStartDateErr", visible: false, font: { color: '#F15E61', size: '12px' } }))))));
        }
    };
    RewardConfig = __decorate([
        components_7.customElements('reward-config')
    ], RewardConfig);
    exports.RewardConfig = RewardConfig;
});
define("@staking/main/panelConfig/staking.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/main/panelConfig/token-selection/index.tsx", "@staking/main/panelConfig/reward.tsx"], function (require, exports, components_8, eth_wallet_4, global_4, store_5, index_2, reward_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StakingConfig = void 0;
    ;
    let StakingConfig = class StakingConfig extends components_8.Module {
        constructor(parent, options) {
            super(parent, options);
            this.unit = 1;
            this.rewardConfig = [];
            this.currentReward = 0;
            this.isInitialized = false;
            this.hourVal = 60 * 60;
            this.units = [
                {
                    name: 'Hour(s)',
                    value: 1
                },
                {
                    name: 'Day(s)',
                    value: 24
                },
                {
                    name: 'Week(s)',
                    value: 7 * 24
                },
            ];
            this.setupInput = () => {
                if (this.wrapperAddressElm) {
                    this.wrapperAddressElm.visible = !this.isNew;
                    this.inputAddress.enabled = this.isNew;
                    this.inputLockingTime.enabled = this.isNew;
                    this.inputPerAddressCap.enabled = this.isNew;
                    this.inputMaxTotalLock.enabled = this.isNew;
                    if (this.btnType) {
                        this.btnType.enabled = this.isNew;
                    }
                    if (this.btnTime) {
                        this.btnTime.enabled = this.isNew;
                    }
                    if (this.tokenSelection) {
                        this.tokenSelection.enabled = this.isNew;
                    }
                    this.btnAdd.visible = store_5.isMultiple && this.isNew;
                    this.btnAdd.enabled = store_5.isMultiple && this.isNew;
                }
            };
            this.setupData = async () => {
                if (this.data) {
                    const { address, lockTokenAddress, minLockTime, maxTotalLock, perAddressCap, customDesc, lockTokenType, rewards } = this.data;
                    this.lockType = lockTokenType;
                    const interval = setInterval(async () => {
                        var _a;
                        if (this.isInitialized && this.tokenSelection.isInitialized) {
                            clearInterval(interval);
                            const tokenMap = store_5.getTokenMapData(this.chainId);
                            const token = tokenMap[lockTokenAddress] || tokenMap[lockTokenAddress === null || lockTokenAddress === void 0 ? void 0 : lockTokenAddress.toLowerCase()];
                            const lockingTime = new eth_wallet_4.BigNumber(minLockTime);
                            this.inputAddress.value = address;
                            this.isAddressValid = true;
                            this.token = token;
                            this.tokenSelection.token = token;
                            this.inputLockingTime.value = lockingTime.dividedBy(this.hourVal).toFixed();
                            // this.lbMinLockTime.caption = lockingTime.isEqualTo(1) ? '1 second' : `${formatNumber(minLockTime)} seconds`;
                            this.inputPerAddressCap.value = new eth_wallet_4.BigNumber(perAddressCap).toFixed();
                            this.inputMaxTotalLock.value = new eth_wallet_4.BigNumber(maxTotalLock).toFixed();
                            this.inputDesc.value = customDesc || '';
                            this.btnType.caption = ((_a = store_5.LockTokenTypeList.find(f => f.value === this.lockType)) === null || _a === void 0 ? void 0 : _a.name) || 'Select Type';
                            this.listRewardButton.clearInnerHTML();
                            this.pnlInfoElm.clearInnerHTML();
                            this.rewardConfig = [];
                            for (const reward of rewards) {
                                await this.onAddReward(reward);
                            }
                        }
                    }, 200);
                }
                else if (!this.rewardConfig.length) {
                    const interval = setInterval(() => {
                        if (this.isInitialized) {
                            clearInterval(interval);
                            this.onAddReward();
                        }
                    }, 200);
                }
            };
            this.renderTimeButton = async () => {
                const vstack = await components_8.VStack.create({ gap: 8 });
                const dropdownModal = await components_8.Modal.create({
                    showBackdrop: false,
                    maxWidth: 80,
                    minWidth: 'auto',
                    popupPlacement: 'bottom'
                });
                this.btnTime = await components_8.Button.create({
                    caption: 'Hour(s)',
                    font: { color: '#FFFFFF' },
                    background: { color: '#0C1234' },
                    border: { style: 'none', radius: 12 },
                    padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
                    rightIcon: { name: 'caret-down', fill: '#F15E61' },
                    width: '100%',
                    height: 40,
                    maxWidth: 80,
                });
                this.btnTime.classList.add('btn-select');
                this.btnTime.onClick = () => { dropdownModal.visible = !dropdownModal.visible; };
                for (const unit of this.units) {
                    const dropdownItem = await components_8.Button.create({
                        caption: unit.name,
                        background: { color: 'transparent' },
                        height: 36,
                    });
                    dropdownItem.onClick = () => {
                        dropdownModal.visible = false;
                        if (this.unit === unit.value)
                            return;
                        this.btnTime.caption = unit.name;
                        this.unit = unit.value;
                        this.updateCampaignEndLockTime();
                    };
                    vstack.appendChild(dropdownItem);
                }
                dropdownModal.item = vstack;
                this.pnlTimeSelection.clearInnerHTML();
                this.pnlTimeSelection.appendChild(this.btnTime);
                this.pnlTimeSelection.appendChild(dropdownModal);
            };
            this.renderTypeButton = async () => {
                var _a;
                const vstack = await components_8.VStack.create({ gap: 8 });
                const dropdownModal = await components_8.Modal.create({
                    showBackdrop: false,
                    width: '100%',
                    maxWidth: 300,
                    popupPlacement: 'bottom'
                });
                if (this.lockType === undefined) {
                    this.lockType = (_a = store_5.LockTokenTypeList[0]) === null || _a === void 0 ? void 0 : _a.value;
                }
                const type = store_5.LockTokenTypeList.find(f => f.value === this.lockType);
                this.btnType = await components_8.Button.create({
                    caption: (type === null || type === void 0 ? void 0 : type.name) || 'Select Type',
                    background: { color: '#0C1234' },
                    font: { color: '#FFFFFF' },
                    border: { style: 'none', radius: 12 },
                    padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
                    rightIcon: { name: 'caret-down', fill: '#F15E61' },
                    width: '100%',
                    height: 40,
                    maxWidth: 300,
                });
                this.btnType.classList.add('btn-select');
                this.btnType.onClick = () => { dropdownModal.visible = !dropdownModal.visible; };
                for (const type of store_5.LockTokenTypeList) {
                    const dropdownItem = await components_8.Button.create({
                        caption: `${type.name} (${type.value})`,
                        background: { color: 'transparent' },
                        height: 36,
                    });
                    dropdownItem.onClick = () => {
                        dropdownModal.visible = false;
                        if (this.lockType === type.value)
                            return;
                        this.btnType.caption = `${type.name} (${type.value})`;
                        this.lockType = type.value;
                    };
                    vstack.appendChild(dropdownItem);
                }
                dropdownModal.item = vstack;
                this.typeSelection.clearInnerHTML();
                this.typeSelection.appendChild(this.btnType);
                this.typeSelection.appendChild(dropdownModal);
            };
            this.onRenderReward = (button, idx) => {
                for (const elm of this.rewardConfig) {
                    elm.visible = false;
                }
                this.rewardConfig[idx].visible = true;
                const active = this.listRewardButton.querySelector('.btn-active');
                if (active) {
                    active.classList.remove('btn-active');
                }
                button.classList.add('btn-active');
                this.currentReward = idx;
            };
            this.removeReward = (idx) => {
                this.listRewardButton.removeChild(this.listRewardButton.childNodes[idx]);
                this.pnlInfoElm.removeChild(this.rewardConfig[idx]);
                this.rewardConfig.splice(idx, 1);
                for (let i = 0; i < this.listRewardButton.childElementCount; i++) {
                    const elm = this.listRewardButton.childNodes[i];
                    const button = elm.firstChild;
                    button.caption = `Reward ${i + 1}`;
                    button.onClick = () => this.onRenderReward(button, i);
                    elm.lastChild.onClick = () => this.removeReward(i);
                    if (this.currentReward === idx && i === 0) {
                        this.onRenderReward(button, 0);
                    }
                }
                this.emitInput();
            };
            this.addReward = async (idx, reward) => {
                if (idx && !reward) {
                    for (const elm of this.rewardConfig) {
                        elm.visible = false;
                    }
                }
                const rewards = [...this.rewardConfig];
                rewards[idx] = new reward_1.RewardConfig();
                rewards[idx].isNew = this.isNew;
                rewards[idx].visible = !(idx && reward);
                this.rewardConfig = [...rewards];
                this.pnlInfoElm.appendChild(this.rewardConfig[idx]);
                this.rewardConfig[idx].chainId = this.chainId;
                this.rewardConfig[idx].data = reward;
                this.rewardConfig[idx].campaignEndLockTime = this.minLockTime.plus(this._campaignEnd).toNumber();
                this.rewardConfig[idx].maxTotal = this.inputMaxTotalLock.value || 0;
                this.rewardConfig[idx].stakingToken = this.token;
                this.currentReward = idx;
                this.emitInput();
            };
            this.onAddReward = async (reward) => {
                this.btnAdd.enabled = false;
                const idx = Number(this.rewardConfig.length);
                const pnl = await components_8.Panel.create({ position: 'relative' });
                pnl.classList.add('pnl-label');
                const icon = await components_8.Icon.create({ name: 'times', fill: '#181e3e', height: 12, width: 12, position: 'absolute', top: 1, right: 1 });
                icon.onClick = () => this.removeReward(idx);
                const button = await components_8.Button.create({ caption: `Reward ${store_5.isMultiple ? idx + 1 : ''}`, padding: { top: 6, bottom: 6, left: 16, right: 16 } });
                button.classList.add('btn-item');
                if (!reward || !idx) {
                    button.classList.add('btn-active');
                }
                button.onClick = () => this.onRenderReward(button, idx);
                const active = this.listRewardButton.querySelector('.btn-active');
                if (!reward && active) {
                    active.classList.remove('btn-active');
                }
                pnl.appendChild(button);
                if (store_5.isMultiple)
                    pnl.appendChild(icon);
                this.listRewardButton.appendChild(pnl);
                await this.addReward(idx, reward);
                this.btnAdd.enabled = true;
            };
            this.onAddRewardByClick = () => {
                if (!store_5.isMultiple)
                    return;
                this.onAddReward();
            };
            this.emitInput = () => {
                components_8.application.EventBus.dispatch("emitInput" /* EmitInput */);
            };
            this.onInputAddress = async () => {
                this.isAddressValid = await global_4.isAddressValid(this.inputAddress.value);
                this.lbAddressErr.visible = !this.isAddressValid;
                this.emitInput();
            };
            this.onInputToken = (token) => {
                this.token = token;
                this.updateStakingToken();
                this.emitInput();
            };
            this.onInputLockingTime = (input) => {
                const _input = input;
                let value = _input.value;
                value = value.replace(/[^0-9]+/g, "");
                _input.value = value;
                this.updateCampaignEndLockTime();
                this.emitInput();
            };
            this.onInputMaxTotalLock = (input) => {
                global_4.limitInputNumber(input, 18);
                this.updateMaxReward();
                this.emitInput();
            };
            this.onInputNumber = (input) => {
                global_4.limitInputNumber(input, 18);
                this.emitInput();
            };
            this.isRewardValid = () => {
                if (!this.rewardConfig.length)
                    return false;
                for (const reward of this.rewardConfig) {
                    if (!reward.checkValidation()) {
                        return false;
                    }
                }
                return true;
            };
            this.checkValidation = () => {
                return this.token && !isNaN(this.lockType) &&
                    global_4.isValidNumber(this.inputLockingTime.value) &&
                    global_4.isValidNumber(this.inputPerAddressCap.value) &&
                    global_4.isValidNumber(this.inputMaxTotalLock.value) &&
                    (this.isNew || this.isAddressValid) &&
                    this.isRewardValid();
            };
            this.getRewardData = () => {
                const rewardData = [];
                const totalRewards = [];
                for (const reward of this.rewardConfig) {
                    const data = reward.getData();
                    rewardData.push(data);
                    totalRewards.push({ value: data.rewardAmount || new eth_wallet_4.BigNumber(0), tokenAddress: data.rewardTokenAddress });
                }
                return { rewardData, totalRewards };
            };
            this.getData = () => {
                var _a;
                const reward = this.getRewardData();
                const staking = {
                    address: this.inputAddress.value,
                    lockTokenAddress: ((_a = this.token) === null || _a === void 0 ? void 0 : _a.address) || '',
                    minLockTime: this.minLockTime,
                    perAddressCap: new eth_wallet_4.BigNumber(this.inputPerAddressCap.value),
                    maxTotalLock: new eth_wallet_4.BigNumber(this.inputMaxTotalLock.value),
                    customDesc: this.inputDesc.value,
                    lockTokenType: this.lockType,
                    rewards: reward.rewardData,
                    totalRewardAmount: reward.totalRewards,
                };
                return staking;
            };
        }
        set chainId(chainId) {
            this._chainId = chainId;
            this.tokenSelection.token = undefined;
            this.token = undefined;
            this.tokenSelection.targetChainId = chainId;
            for (const elm of this.rewardConfig) {
                elm.chainId = chainId;
                elm.stakingToken = undefined;
            }
        }
        get chainId() {
            return this._chainId || store_5.getChainId() || store_5.getDefaultChainId();
        }
        set isNew(value) {
            this._isNew = value;
            this.setupInput();
        }
        get isNew() {
            return this._isNew;
        }
        set data(value) {
            this._data = value;
            this.setupData();
        }
        get data() {
            return this._data;
        }
        set campaignEnd(value) {
            this._campaignEnd = value;
            this.updateCampaignEndLockTime();
        }
        get campaignEnd() {
            return this._campaignEnd || 0;
        }
        get minLockTime() {
            if (this.inputLockingTime) {
                return new eth_wallet_4.BigNumber(this.inputLockingTime.value || 0).multipliedBy(this.unit).multipliedBy(this.hourVal);
            }
            return new eth_wallet_4.BigNumber(0);
        }
        updateCampaignEndLockTime() {
            const val = this.minLockTime.plus(this.campaignEnd).toNumber();
            for (const reward of this.rewardConfig) {
                reward.campaignEndLockTime = val;
            }
        }
        updateMaxReward() {
            const val = this.inputMaxTotalLock.value;
            for (const reward of this.rewardConfig) {
                reward.maxTotal = val;
            }
        }
        updateStakingToken() {
            for (const reward of this.rewardConfig) {
                reward.stakingToken = this.token;
            }
        }
        async init() {
            super.init();
            this.tokenSelection = new index_2.TokenSelection();
            this.tokenSelection.onSelectToken = this.onInputToken;
            this.pnlTokenSelection.appendChild(this.tokenSelection);
            await this.renderTimeButton();
            await this.renderTypeButton();
            this.setupInput();
            this.isInitialized = true;
        }
        render() {
            return (this.$render("i-panel", { class: "custom-scroll", display: "block", minHeight: 750 },
                this.$render("i-vstack", { gap: 10, verticalAlignment: "center", class: "main-content" },
                    this.$render("i-hstack", { id: "wrapperAddressElm", gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Address" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, class: "w-input", verticalAlignment: "center" },
                            this.$render("i-input", { id: "inputAddress", class: "input-text w-input w-100", onChanged: this.onInputAddress }),
                            this.$render("i-label", { id: "lbAddressErr", visible: false, caption: "The address is invalid!", font: { color: '#F15E61', size: '12px' } }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Lock Token Address" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-panel", { id: "pnlTokenSelection", class: "w-input" })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Locking Time" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-hstack", { gap: 4, class: "w-input", verticalAlignment: "center", wrap: "nowrap" },
                            this.$render("i-input", { id: "inputLockingTime", inputType: "number", width: 216, class: "input-text", onChanged: (src) => this.onInputLockingTime(src) }),
                            this.$render("i-panel", { id: "pnlTimeSelection", class: "network-selection", width: 80 }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Max Total Lock" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-input", { id: "inputMaxTotalLock", inputType: "number", class: "input-text w-input", onChanged: (src) => this.onInputMaxTotalLock(src) })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Per Address Cap" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-input", { id: "inputPerAddressCap", inputType: "number", class: "input-text w-input", onChanged: (src) => this.onInputNumber(src) })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-label", { class: "lb-title", caption: "Staking Description" }),
                        this.$render("i-input", { id: "inputDesc", class: "input-area w-input", inputType: "textarea", rows: 3 })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Lock Token Type" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-panel", { id: "typeSelection", class: "network-selection w-input" })),
                    this.$render("i-hstack", { gap: 10, margin: { top: 10, bottom: 5 }, width: "100%", verticalAlignment: "center", horizontalAlignment: "space-between", wrap: "wrap-reverse" },
                        this.$render("i-hstack", { id: "listRewardButton", verticalAlignment: "center" }),
                        this.$render("i-button", { id: "btnAdd", visible: store_5.isMultiple, class: "btn-os", margin: { left: 'auto' }, caption: "Add Reward", onClick: () => this.onAddRewardByClick() })),
                    this.$render("i-panel", { width: "100%", height: 2, margin: { bottom: 10 }, background: { color: '#6573c3' } }),
                    this.$render("i-panel", { id: "pnlInfoElm" }))));
        }
    };
    StakingConfig = __decorate([
        components_8.customElements('staking-config')
    ], StakingConfig);
    exports.StakingConfig = StakingConfig;
});
define("@staking/main/panelConfig/campaign.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/main/panelConfig/staking.tsx"], function (require, exports, components_9, eth_wallet_5, global_5, store_6, staking_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CampaignConfig = void 0;
    ;
    let CampaignConfig = class CampaignConfig extends components_9.Module {
        constructor(parent, options) {
            super(parent, options);
            this.stakingConfig = [];
            this.currentStaking = 0;
            this.logoUrl = '';
            this.isAdminValid = false;
            this.isInitialized = false;
            this.setupInput = () => {
                if (this.wapperNetworkElm) {
                    this.wapperNetworkElm.visible = !this.isNew;
                    if (this.btnNetwork) {
                        this.btnNetwork.enabled = this.isNew;
                    }
                    this.inputCampaignStart.enabled = this.isNew;
                    this.inputCampaignEnd.enabled = this.isNew;
                    if (!this.isNew) {
                        this.inputCampaignStart.classList.add('input-disabled');
                        this.inputCampaignEnd.classList.add('input-disabled');
                    }
                    this.inputAdmin.enabled = this.isNew;
                    this.btnAdd.visible = store_6.isMultiple && this.isNew;
                    this.btnAdd.enabled = store_6.isMultiple && this.isNew;
                }
            };
            this.setupData = async () => {
                if (this.data) {
                    const { chainId, customName, customDesc, customLogo, getTokenURL, campaignStart, campaignEnd, showContractLink, admin, customColorCampaign, customColorBackground, customColorStakingBackground, customColorButton, customColorText, customColorTimeBackground, stakings } = this.data;
                    const interval = setInterval(async () => {
                        if (this.isInitialized) {
                            clearInterval(interval);
                            this.network = chainId || store_6.getChainId();
                            this.inputName.value = customName;
                            this.inputDesc.value = customDesc || '';
                            this.inputURL.value = getTokenURL || '';
                            if (customLogo) {
                                this.uploadLogo.preview(customLogo);
                            }
                            const start = new eth_wallet_5.BigNumber(campaignStart).toNumber();
                            const end = new eth_wallet_5.BigNumber(campaignEnd).toNumber();
                            this.campaignStart = start;
                            this.campaignEnd = end;
                            const startElm = this.inputCampaignStart.querySelector('input[type="text"]');
                            const endElm = this.inputCampaignEnd.querySelector('input[type="text"]');
                            startElm.value = components_9.moment.unix(start).format(global_5.DefaultDateTimeFormat);
                            endElm.value = components_9.moment.unix(end).format(global_5.DefaultDateTimeFormat);
                            this.checkboxContract.checked = !!showContractLink;
                            this.inputAdmin.value = admin;
                            if (admin) {
                                this.isAdminValid = await global_5.isAddressValid(admin);
                                this.lbErrAdmin.visible = !this.isAdminValid;
                            }
                            this.inputMainColor.value = customColorCampaign || '';
                            this.inputBg.value = customColorBackground || '';
                            this.inputColorText.value = customColorText || '';
                            this.inputCountdownBg.value = customColorTimeBackground || '';
                            this.inputStakingBg.value = customColorStakingBackground || '';
                            this.inputStakingBtn.value = customColorButton || '';
                            const networkObj = store_6.Networks.find(f => f.chainId === this.network);
                            this.btnNetwork.caption = networkObj ? `${networkObj.name} (${networkObj.chainId})` : 'Unknown Network';
                            this.listStakingButton.clearInnerHTML();
                            this.pnlInfoElm.clearInnerHTML();
                            this.stakingConfig = [];
                            for (const staking of stakings) {
                                await this.onAddStaking(staking);
                            }
                        }
                    }, 200);
                }
                else if (!this.stakingConfig.length) {
                    const interval = setInterval(() => {
                        if (this.isInitialized) {
                            clearInterval(interval);
                            this.onAddStaking();
                        }
                    }, 200);
                }
            };
            this.setAttrDatePicker = () => {
                this.inputCampaignStart.dateTimeFormat = global_5.DefaultDateTimeFormat;
                this.inputCampaignEnd.dateTimeFormat = global_5.DefaultDateTimeFormat;
                this.inputCampaignStart.onChanged = (datepickerElm) => this.changeStartDate(datepickerElm.inputElm.value);
                this.inputCampaignEnd.onChanged = (datepickerElm) => this.changeEndDate(datepickerElm.inputElm.value);
                // const minDate = moment();
                const startTextElm = this.inputCampaignStart.querySelector('input[type="text"]');
                // const startDateElm = this.inputCampaignStart.querySelector('input[type="datetime-local"]') as HTMLInputElement;
                const endTextElm = this.inputCampaignEnd.querySelector('input[type="text"]');
                // const endDateElm = this.inputCampaignEnd.querySelector('input[type="datetime-local"]') as HTMLInputElement;
                // if (startDateElm) {
                //   startDateElm.min = minDate.add(300, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                // }
                if (startTextElm) {
                    startTextElm.placeholder = global_5.DefaultDateTimeFormat;
                }
                // if (endDateElm) {
                //   endDateElm.min = minDate.add(360, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                // }
                if (endTextElm) {
                    endTextElm.placeholder = global_5.DefaultDateTimeFormat;
                }
            };
            this.checkCampaignDate = () => {
                const date = components_9.moment();
                // if (date.unix() > this.campaignStart) {
                // 	this.lbCampaignStartErr.visible = true;
                // 	this.lbCampaignStartErr.caption = `The campaign start must be after <b>${date.add(300, 'seconds').format(DefaultDateTimeFormat)}</b>`;
                // } else
                if (this.campaignEnd && this.campaignStart >= this.campaignEnd) {
                    this.lbCampaignStartErr.visible = true;
                    this.lbCampaignStartErr.caption = `The campaign start must be before the campaign end`;
                }
                else {
                    this.lbCampaignStartErr.visible = false;
                }
                // if (this.campaignEnd <= date.unix()) {
                // 	this.lbCampaignEndErr.visible = true;
                // 	this.lbCampaignEndErr.caption = `The campaign end must be after the <b>${date.add(360, 'seconds').format(DefaultDateTimeFormat)}</b>`;
                // } else
                if (this.campaignStart >= this.campaignEnd) {
                    this.lbCampaignEndErr.visible = true;
                    this.lbCampaignEndErr.caption = `The campaign end must be after the campaign start`;
                }
                else {
                    this.lbCampaignEndErr.visible = false;
                }
            };
            this.changeStartDate = (value) => {
                const inputEndDate = this.inputCampaignEnd.querySelector('input[type="datetime-local"]');
                const date = components_9.moment(value, global_5.DefaultDateTimeFormat);
                this.campaignStart = date.unix();
                if (inputEndDate) {
                    inputEndDate.min = date.add(60, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                    this.checkCampaignDate();
                }
                this.emitInput();
            };
            this.changeEndDate = (value) => {
                const inputStartDate = this.inputCampaignStart.querySelector('input[type="datetime-local"]');
                const date = components_9.moment(value, global_5.DefaultDateTimeFormat);
                this.campaignEnd = date.unix();
                if (inputStartDate) {
                    inputStartDate.max = date.subtract(60, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                    this.checkCampaignDate();
                }
                for (const staking of this.stakingConfig) {
                    staking.campaignEnd = this.campaignEnd;
                }
                this.emitInput();
            };
            this.renderNetworkButton = async () => {
                const vstack = await components_9.VStack.create({ gap: 8 });
                const dropdownModal = await components_9.Modal.create({
                    showBackdrop: false,
                    width: '100%',
                    maxWidth: 300,
                    popupPlacement: 'bottom',
                });
                const listNetwork = store_6.Networks.filter(f => !f.isDisabled);
                const networkObj = listNetwork.find(f => f.chainId === this.network);
                this.btnNetwork = await components_9.Button.create({
                    caption: networkObj ? `${networkObj.name} (${networkObj.chainId})` : 'Select Network',
                    background: { color: '#0C1234' },
                    font: { color: '#FFFFFF' },
                    border: { style: 'none', radius: 12 },
                    padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
                    rightIcon: { name: 'caret-down', fill: '#F15E61' },
                    width: '100%',
                    height: 40,
                    maxWidth: 300,
                    enabled: this.isNew,
                });
                this.btnNetwork.classList.add('btn-select');
                this.btnNetwork.onClick = () => { dropdownModal.visible = !dropdownModal.visible; };
                for (const network of listNetwork) {
                    const dropdownItem = await components_9.Button.create({
                        caption: `${network.name} (${network.chainId})`,
                        background: { color: 'transparent' },
                        height: 36,
                    });
                    dropdownItem.onClick = () => {
                        dropdownModal.visible = false;
                        if (this.network === network.chainId)
                            return;
                        this.btnNetwork.caption = `${network.name} (${network.chainId})`;
                        this.network = network.chainId;
                        for (const elm of this.stakingConfig) {
                            elm.chainId = this.network;
                        }
                        this.emitInput();
                    };
                    vstack.appendChild(dropdownItem);
                }
                dropdownModal.item = vstack;
                this.networkSelection.clearInnerHTML();
                this.networkSelection.appendChild(this.btnNetwork);
                this.networkSelection.appendChild(dropdownModal);
            };
            this.onRenderStaking = (button, idx) => {
                for (const elm of this.stakingConfig) {
                    elm.visible = false;
                }
                this.stakingConfig[idx].visible = true;
                const active = this.listStakingButton.querySelector('.btn-active');
                if (active) {
                    active.classList.remove('btn-active');
                }
                button.classList.add('btn-active');
                this.currentStaking = idx;
            };
            this.removeStaking = (idx) => {
                this.listStakingButton.removeChild(this.listStakingButton.childNodes[idx]);
                this.pnlInfoElm.removeChild(this.stakingConfig[idx]);
                this.stakingConfig.splice(idx, 1);
                for (let i = 0; i < this.listStakingButton.childElementCount; i++) {
                    const elm = this.listStakingButton.childNodes[i];
                    const button = elm.firstChild;
                    button.caption = `Staking ${i + 1}`;
                    button.onClick = () => this.onRenderStaking(button, i);
                    elm.lastChild.onClick = () => this.removeStaking(i);
                    if (this.currentStaking === idx && i === 0) {
                        this.onRenderStaking(button, 0);
                    }
                }
                this.emitInput();
            };
            this.addStaking = async (idx, staking) => {
                if (idx && !staking) {
                    for (const elm of this.stakingConfig) {
                        elm.visible = false;
                    }
                }
                const stakings = [...this.stakingConfig];
                stakings[idx] = new staking_1.StakingConfig();
                stakings[idx].isNew = this.isNew;
                stakings[idx].visible = !(idx && staking);
                this.stakingConfig = [...stakings];
                this.pnlInfoElm.appendChild(this.stakingConfig[idx]);
                this.stakingConfig[idx].chainId = this.network;
                this.stakingConfig[idx].data = staking;
                this.currentStaking = idx;
                this.emitInput();
            };
            this.onAddStaking = async (staking) => {
                this.btnAdd.enabled = false;
                const idx = Number(this.stakingConfig.length);
                const pnl = await components_9.Panel.create({ position: 'relative' });
                pnl.classList.add('pnl-label');
                const icon = await components_9.Icon.create({ name: 'times', fill: '#181e3e', height: 12, width: 12, position: 'absolute', top: 1, right: 1 });
                icon.onClick = () => this.removeStaking(idx);
                const button = await components_9.Button.create({ caption: `Staking ${store_6.isMultiple ? idx + 1 : ''}`, padding: { top: 6, bottom: 6, left: 16, right: 16 } });
                button.classList.add('btn-item');
                if (!staking || !idx) {
                    button.classList.add('btn-active');
                }
                button.onClick = () => this.onRenderStaking(button, idx);
                const active = this.listStakingButton.querySelector('.btn-active');
                if (!staking && active) {
                    active.classList.remove('btn-active');
                }
                pnl.appendChild(button);
                if (store_6.isMultiple)
                    pnl.appendChild(icon);
                this.listStakingButton.appendChild(pnl);
                await this.addStaking(idx, staking);
                this.btnAdd.enabled = true;
            };
            this.onAddStakingByClick = () => {
                if (!store_6.isMultiple)
                    return;
                this.onAddStaking();
            };
            this.emitInput = () => {
                components_9.application.EventBus.dispatch("emitInput" /* EmitInput */);
            };
            this.onInputText = () => {
            };
            this.onInputAdmin = async () => {
                this.isAdminValid = await global_5.isAddressValid(this.inputAdmin.value);
                this.lbErrAdmin.visible = !this.isAdminValid;
                this.emitInput();
            };
            this.isStakingValid = () => {
                if (!this.stakingConfig.length)
                    return false;
                for (const staking of this.stakingConfig) {
                    if (!staking.checkValidation()) {
                        return false;
                    }
                }
                return true;
            };
            this.checkBalances = () => {
                if (!this.isNew)
                    return true;
                const stakings = this.getStakingData();
                let listRewardNeeded = {};
                for (const staking of stakings) {
                    const totalRewards = staking.totalRewardAmount;
                    if (totalRewards) {
                        for (const rewardNeeded of totalRewards) {
                            const { tokenAddress, value } = rewardNeeded;
                            if (listRewardNeeded[tokenAddress]) {
                                listRewardNeeded[tokenAddress] = new eth_wallet_5.BigNumber(listRewardNeeded[tokenAddress]).plus(value);
                            }
                            else {
                                listRewardNeeded[tokenAddress] = value;
                            }
                        }
                    }
                }
                const tokenMap = store_6.getTokenMap();
                let isValid = true;
                let invalidTokens = [];
                for (const key of Object.keys(listRewardNeeded)) {
                    const token = tokenMap[key.toLowerCase()];
                    const amount = listRewardNeeded[key];
                    const balance = store_6.getTokenBalance(token);
                    if (amount.gt(balance)) {
                        invalidTokens.push(token.symbol);
                        isValid = false;
                    }
                }
                this.lbErrBalance.caption = `Insufficient ${invalidTokens.join(', ')} balance${invalidTokens.length > 1 ? 's' : ''}`;
                this.lbErrBalance.visible = !isValid;
                return isValid;
            };
            this.checkValidation = () => {
                return this.checkBalances() &&
                    !!this.inputName.value &&
                    this.campaignStart &&
                    // this.campaignStart >= moment().unix() &&
                    this.campaignStart < this.campaignEnd &&
                    this.isAdminValid &&
                    this.isStakingValid();
            };
            this.getStakingData = () => {
                const stakingData = [];
                for (const staking of this.stakingConfig) {
                    const data = staking.getData();
                    stakingData.push(data);
                }
                return stakingData;
            };
            this.getData = () => {
                const campaign = {
                    chainId: this.network,
                    customName: this.inputName.value,
                    customDesc: this.inputDesc.value || undefined,
                    customLogo: this.logoUrl || undefined,
                    getTokenURL: this.inputURL.value || undefined,
                    campaignStart: new eth_wallet_5.BigNumber(this.campaignStart),
                    campaignEnd: new eth_wallet_5.BigNumber(this.campaignEnd),
                    showContractLink: this.checkboxContract.checked || undefined,
                    admin: `${this.inputAdmin.value}`,
                    customColorCampaign: store_6.isThemeApplied ? undefined : this.inputMainColor.value || undefined,
                    customColorBackground: store_6.isThemeApplied ? undefined : this.inputBg.value || undefined,
                    customColorStakingBackground: store_6.isThemeApplied ? undefined : this.inputStakingBg.value || undefined,
                    customColorButton: store_6.isThemeApplied ? undefined : this.inputStakingBtn.value || undefined,
                    customColorText: store_6.isThemeApplied ? undefined : this.inputColorText.value || undefined,
                    customColorTimeBackground: store_6.isThemeApplied ? undefined : this.inputCountdownBg.value || undefined,
                    stakings: this.getStakingData(),
                };
                return campaign;
            };
        }
        set chainId(chainId) {
            for (const elm of this.stakingConfig) {
                elm.chainId = chainId;
            }
        }
        set isNew(value) {
            this._isNew = value;
            this.setupInput();
        }
        get isNew() {
            return this._isNew;
        }
        set data(value) {
            this._data = value;
            this.setupData();
        }
        get data() {
            return this._data;
        }
        onBeforeUpload(target, file) {
            return new Promise((resolve, reject) => {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    reject('File size can not exceed 2MB!');
                }
                resolve(isLt2M);
            });
        }
        async onChangeFile(source, files) {
            if (!files.length)
                return;
            const data = await this.uploadLogo.toBase64(files[0]);
            this.logoUrl = data || '';
        }
        onRemove(source, file) {
            this.logoUrl = '';
        }
        async init() {
            this.network = store_6.getChainId() || store_6.getDefaultChainId();
            super.init();
            this.setAttrDatePicker();
            this.setupInput();
            await this.renderNetworkButton();
            this.isInitialized = true;
        }
        render() {
            return (this.$render("i-panel", { class: "custom-scroll" },
                this.$render("i-vstack", { gap: 10, verticalAlignment: "center", class: "main-content" },
                    this.$render("i-hstack", { id: "wapperNetworkElm", gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Network" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-panel", { id: "networkSelection", class: "network-selection w-input" })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Campaign Name" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-input", { id: "inputName", class: "input-text w-input", onChanged: this.emitInput })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-label", { class: "lb-title", caption: "Campaign Description" }),
                        this.$render("i-input", { id: "inputDesc", class: "input-area w-input", inputType: "textarea", rows: 3, onChanged: this.onInputText })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-label", { class: "lb-title", caption: "Campaign Logo" }),
                        this.$render("i-vstack", { gap: 4, verticalAlignment: "center", class: "w-input", position: "relative" },
                            this.$render("i-upload", { id: "uploadLogo", class: "input-text w-input cs-upload", accept: "image/*", onUploading: this.onBeforeUpload.bind(this), onChanged: this.onChangeFile.bind(this), onRemoved: this.onRemove.bind(this) }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-label", { class: "lb-title", caption: "Token Trade URL" }),
                        this.$render("i-input", { id: "inputURL", class: "input-text w-input", onChanged: this.onInputText })),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Campaign Start" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, verticalAlignment: "center", class: "w-input", position: "relative" },
                            this.$render("i-datepicker", { id: "inputCampaignStart", width: "100%", height: 40, type: "dateTime", class: "cs-datepicker" }),
                            this.$render("i-label", { id: "lbCampaignStartErr", visible: false, font: { color: '#F15E61', size: '12px' } }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Campaign End" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, verticalAlignment: "center", class: "w-input", position: "relative" },
                            this.$render("i-datepicker", { id: "inputCampaignEnd", width: "100%", height: 40, type: "dateTime", class: "cs-datepicker" }),
                            this.$render("i-label", { id: "lbCampaignEndErr", visible: false, font: { color: '#F15E61', size: '12px' } }))),
                    this.$render("i-hstack", { gap: 10, class: "row-mobile", margin: { top: 5, bottom: 5 }, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-label", { class: "lb-title", caption: "Show Contract Link" }),
                        this.$render("i-vstack", { verticalAlignment: "center", horizontalAlignment: "start", class: "w-input" },
                            this.$render("i-checkbox", { id: "checkboxContract", height: "auto", checked: false }))),
                    this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                        this.$render("i-hstack", { gap: 4, verticalAlignment: "center" },
                            this.$render("i-label", { class: "lb-title", caption: "Admin" }),
                            this.$render("i-label", { caption: "*", font: { color: '#F15E61', size: '16px' } })),
                        this.$render("i-vstack", { gap: 4, class: "w-input", verticalAlignment: "center" },
                            this.$render("i-input", { id: "inputAdmin", class: "input-text w-input w-100", onChanged: this.onInputAdmin }),
                            this.$render("i-label", { id: "lbErrAdmin", visible: false, caption: "The address is invalid!", font: { color: '#F15E61', size: '12px' } }))),
                    this.$render("i-vstack", { visible: store_6.isThemeApplied, gap: 10, width: "100%", verticalAlignment: "center" },
                        this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                            this.$render("i-label", { class: "lb-title", caption: "Campaign Main Color" }),
                            this.$render("i-input", { id: "inputMainColor", placeholder: "#f15e61", class: "input-text w-input", onChanged: this.onInputText })),
                        this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                            this.$render("i-label", { class: "lb-title", caption: "Campaign Background" }),
                            this.$render("i-input", { id: "inputBg", placeholder: "#ffffff26", class: "input-text w-input", onChanged: this.onInputText })),
                        this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                            this.$render("i-label", { class: "lb-title", caption: "Color Text" }),
                            this.$render("i-input", { id: "inputColorText", placeholder: "#ffffff", class: "input-text w-input", onChanged: this.onInputText })),
                        this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                            this.$render("i-label", { class: "lb-title", caption: "Countdown Background" }),
                            this.$render("i-input", { id: "inputCountdownBg", placeholder: "#b14781", class: "input-text w-input", onChanged: this.onInputText })),
                        this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                            this.$render("i-label", { class: "lb-title", caption: "Staking Background" }),
                            this.$render("i-input", { id: "inputStakingBg", placeholder: "#ffffff07", class: "input-text w-input", onChanged: this.onInputText })),
                        this.$render("i-hstack", { gap: 10, verticalAlignment: "center", horizontalAlignment: "space-between" },
                            this.$render("i-label", { class: "lb-title", caption: "Staking Button" }),
                            this.$render("i-input", { id: "inputStakingBtn", placeholder: "linear-gradient(90deg, #AC1D78 0%, #E04862 100%)", class: "input-text w-input", onChanged: this.onInputText }))),
                    this.$render("i-hstack", { gap: 10, margin: { top: 10, bottom: 5 }, width: "100%", verticalAlignment: "center", horizontalAlignment: "space-between", wrap: "wrap-reverse" },
                        this.$render("i-hstack", { id: "listStakingButton", verticalAlignment: "center" }),
                        this.$render("i-button", { visible: store_6.isMultiple, id: "btnAdd", class: "btn-os", margin: { left: 'auto' }, caption: "Add Staking", onClick: () => this.onAddStakingByClick() })),
                    this.$render("i-panel", { width: "100%", height: 2, margin: { bottom: 10 }, background: { color: '#6573C3' } }),
                    this.$render("i-panel", { id: "pnlInfoElm" }),
                    this.$render("i-label", { id: "lbErrBalance", visible: false, font: { size: '14px', color: '#f50057', bold: true }, display: "flex", margin: { top: 10 } }))));
        }
    };
    CampaignConfig = __decorate([
        components_9.customElements('campaign-config')
    ], CampaignConfig);
    exports.CampaignConfig = CampaignConfig;
});
define("@staking/main/panelConfig/panel-config.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/main/panelConfig/campaign.tsx", "@staking/staking-utils", "@staking/result", "@staking/main/panelConfig/panel-config.css.ts"], function (require, exports, components_10, eth_wallet_6, global_6, store_7, campaign_1, staking_utils_2, result_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PanelConfig = void 0;
    ;
    let PanelConfig = class PanelConfig extends components_10.Module {
        constructor(parent, options) {
            super(parent, options);
            this.campaignConfig = [];
            this.currentCampaign = 0;
            this.registerEvent = () => {
                this.$eventBus.register(this, "emitInput" /* EmitInput */, this.updateButton);
                this.$eventBus.register(this, "isWalletConnected" /* IsWalletConnected */, this.renderUI);
                this.$eventBus.register(this, "IsWalletDisconnected" /* IsWalletDisconnected */, this.renderUI);
                this.$eventBus.register(this, "chainChanged" /* chainChanged */, this.onChangeChanged);
            };
            this.renderUI = () => {
                const isConnected = store_7.isWalletConnected();
                this.networkElm.visible = !isConnected;
                this.campaignElm.visible = isConnected;
                this.updateNetworkName(store_7.getChainId());
            };
            this.onChangeChanged = () => {
                const chainId = store_7.getChainId();
                this.updateNetworkName(chainId);
                if (this.isNew) {
                    for (const campaign of this.campaignConfig) {
                        campaign.chainId = chainId;
                    }
                }
                this.updateButton();
            };
            this.showInputCampaign = async (isNew, campaigns) => {
                this.wrapperNetworkElm.visible = isNew;
                this.wapperCampaignsButton.visible = store_7.isMultiple && !isNew;
                this.btnAdd.enabled = !isNew;
                this.groupBtnSaveElm.visible = !isNew;
                this.groupBtnDeployElm.visible = isNew;
                this.isNew = isNew;
                this.initInputFile();
                this.pnlInfoElm.clearInnerHTML();
                this.listCampaignButton.clearInnerHTML();
                this.campaignConfig = [];
                if (campaigns && campaigns.length) {
                    for (const campaign of campaigns) {
                        await this.onAddCampaign(false, campaign);
                    }
                }
                else {
                    this.onAddCampaign(true);
                }
            };
            this.onBack = () => {
                this.pnlInfoElm.clearInnerHTML();
                this.listCampaignButton.clearInnerHTML();
                this.campaignConfig = [];
                if (this.onReset) {
                    this.onReset();
                }
            };
            this.updateNetworkName = (chainId) => {
                const network = store_7.getNetworkInfo(chainId);
                this.lbNetworkName.caption = network ? network.name : 'Unknown Network';
            };
            this.onRenderCampaign = (button, idx) => {
                for (const elm of this.campaignConfig) {
                    elm.visible = false;
                }
                this.campaignConfig[idx].visible = true;
                const active = this.listCampaignButton.querySelector('.btn-active');
                if (active) {
                    active.classList.remove('btn-active');
                }
                button.classList.add('btn-active');
                this.currentCampaign = idx;
            };
            this.removeCampaign = (idx) => {
                this.listCampaignButton.removeChild(this.listCampaignButton.childNodes[idx]);
                this.pnlInfoElm.removeChild(this.campaignConfig[idx]);
                this.campaignConfig.splice(idx, 1);
                for (let i = 0; i < this.listCampaignButton.childElementCount; i++) {
                    const elm = this.listCampaignButton.childNodes[i];
                    const button = elm.firstChild;
                    button.caption = `Campaign ${i + 1}`;
                    button.onClick = () => this.onRenderCampaign(button, i);
                    elm.lastChild.onClick = () => this.removeCampaign(i);
                    if (this.currentCampaign === idx && i === 0) {
                        this.onRenderCampaign(button, 0);
                    }
                }
            };
            this.addCampaign = async (idx, showLast, campaign) => {
                if ((idx && !campaign) || showLast) {
                    for (const elm of this.campaignConfig) {
                        elm.visible = false;
                    }
                }
                const campaigns = [...this.campaignConfig];
                campaigns[idx] = new campaign_1.CampaignConfig();
                campaigns[idx].isNew = this.isNew;
                campaigns[idx].data = campaign;
                campaigns[idx].visible = !(idx && campaign) || showLast;
                this.campaignConfig = [...campaigns];
                this.pnlInfoElm.appendChild(this.campaignConfig[idx]);
                this.currentCampaign = idx;
            };
            this.onAddCampaign = async (showLast, campaign) => {
                const idx = Number(this.campaignConfig.length);
                if (!this.isNew) {
                    this.btnAdd.enabled = false;
                    const pnl = await components_10.Panel.create({ position: 'relative' });
                    pnl.classList.add('pnl-label');
                    const icon = await components_10.Icon.create({ name: 'times', fill: '#181e3e', height: 12, width: 12, position: 'absolute', top: 1, right: 1 });
                    icon.onClick = () => this.removeCampaign(idx);
                    const button = await components_10.Button.create({ caption: `Campaign ${idx + 1}`, padding: { top: 6, bottom: 6, left: 16, right: 16 } });
                    button.classList.add('btn-item');
                    if (!campaign || !idx || showLast) {
                        button.classList.add('btn-active');
                    }
                    button.onClick = () => this.onRenderCampaign(button, idx);
                    const active = this.listCampaignButton.querySelector('.btn-active');
                    if ((!campaign || showLast) && active) {
                        active.classList.remove('btn-active');
                    }
                    pnl.appendChild(button);
                    pnl.appendChild(icon);
                    this.listCampaignButton.appendChild(pnl);
                }
                await this.addCampaign(idx, showLast, campaign);
                if (!this.isNew) {
                    this.btnAdd.enabled = true;
                }
            };
            this.onAddCampaignByClick = () => {
                var _a, _b;
                if (this.isNew || !store_7.isMultiple)
                    return;
                (_b = (_a = this.importFileElm.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.click();
                // this.onAddCampaign();
            };
            this.onClose = () => {
                this.importFileErrModal.visible = false;
            };
            this.initInputFile = () => {
                var _a;
                this.importFileElm.caption = '<input type="file" accept=".json" />';
                const inputElm = (_a = this.importFileElm.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild;
                if (inputElm) {
                    inputElm.onchange = (event) => {
                        const reader = new FileReader();
                        const files = event.target.files;
                        if (!files.length) {
                            return;
                        }
                        const file = files[0];
                        reader.readAsBinaryString(file);
                        reader.onload = (event) => {
                            const { loaded, total } = event;
                            const isCompleted = loaded === total;
                            if (isCompleted) {
                                this.initInputFile();
                                this.convertJSONToObj(reader.result);
                            }
                        };
                    };
                }
            };
            this.convertJSONToObj = async (result) => {
                if (!result)
                    this.showImportJsonError('Data is corrupted. No data were recovered.');
                try {
                    const obj = JSON.parse(result);
                    const length = Object.keys(obj).length;
                    if (!length) {
                        this.showImportJsonError('No data found in the imported file.');
                    }
                    else {
                        const keys = Object.keys(obj);
                        let campaigns = [];
                        for (const key of keys) {
                            const arr = obj[key].map((item) => {
                                item.chainId = Number(key);
                                return item;
                            });
                            campaigns.push(...arr);
                        }
                        for (const campaign of campaigns) {
                            await this.onAddCampaign(true, campaign);
                        }
                    }
                }
                catch (_a) {
                    this.showImportJsonError('Data is corrupted. No data were recovered.');
                }
            };
            this.updateButton = () => {
                var _a, _b;
                const valid = this.checkValidation();
                if (this.isNew) {
                    if (this.btnDeployExport.rightIcon.visible)
                        return;
                    const currentAddress = eth_wallet_6.Wallet.getInstance().address || '';
                    const data = this.campaignConfig && ((_a = this.campaignConfig[0]) === null || _a === void 0 ? void 0 : _a.getData());
                    this.btnExport.enabled = valid;
                    this.btnDeployExport.enabled = valid && currentAddress.toLowerCase() === ((_b = data === null || data === void 0 ? void 0 : data.admin) === null || _b === void 0 ? void 0 : _b.toLowerCase());
                }
                else {
                    this.btnSave.enabled = valid;
                    this.btnDownload.enabled = valid;
                }
            };
            this.checkValidation = () => {
                if (!this.campaignConfig.length)
                    return false;
                for (const campaign of this.campaignConfig) {
                    if (!campaign.checkValidation()) {
                        return false;
                    }
                }
                return true;
            };
            this.getStakingCampaignData = () => {
                const campaignData = [];
                for (const campaign of this.campaignConfig) {
                    const data = campaign.getData();
                    campaignData.push(data);
                }
                return campaignData;
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
            this.parseData = () => {
                const arr = this.getStakingCampaignData();
                this.campaigns = arr.reduce((result, currentValue) => {
                    (result[currentValue['chainId']] = result[currentValue['chainId']] || []).push(currentValue);
                    return result;
                }, {});
            };
            this.onSave = () => {
                if (!this.isNew && this.checkValidation()) {
                    this.parseData();
                    const campaigns = Object.assign({}, this.campaigns);
                    this.onConfigSave(campaigns);
                }
            };
            this.onDownload = (data) => {
                if (this.isNew && data) {
                    global_6.downloadJsonFile('campaign.json', Object.assign({}, data));
                    return;
                }
                if (this.checkValidation()) {
                    this.parseData();
                    const campaigns = Object.assign({}, this.campaigns);
                    global_6.downloadJsonFile('campaign.json', campaigns);
                }
            };
            this.onDeployCampaign = async () => {
                if (this.isNew && this.checkValidation()) {
                    const campaign = this.campaignConfig[0].getData();
                    const chainId = store_7.getChainId();
                    let result;
                    this.showResultMessage(this.stakingResult, 'warning', `Deploying ${campaign.customName}`);
                    const onUpdateBtn = () => {
                        this.btnDeployExport.rightIcon.visible = false;
                        this.btnDeployExport.caption = 'Deploy and Export JSON';
                        this.updateButton();
                        this.backElm.classList.add('cursor-pointer');
                        this.backElm.onClick = () => this.onBack();
                    };
                    const callBack = async (err, reply) => {
                        if (err) {
                            this.showResultMessage(this.stakingResult, 'error', err);
                            onUpdateBtn();
                        }
                        else {
                            this.showResultMessage(this.stakingResult, 'success', reply);
                            this.backElm.classList.remove('cursor-pointer');
                            this.backElm.onClick = () => { };
                            this.btnExport.enabled = false;
                            this.btnDeployExport.enabled = false;
                            this.btnDeployExport.caption = 'Deploying & Exporting';
                            this.btnDeployExport.rightIcon.visible = true;
                        }
                    };
                    const confirmationCallBack = async (receipt) => {
                        if (!result)
                            return;
                        onUpdateBtn();
                    };
                    global_6.registerSendTxEvents({
                        transactionHash: callBack,
                        confirmation: confirmationCallBack
                    });
                    result = await staking_utils_2.deployCampaign(campaign, callBack);
                    if (result) {
                        this.stakingResult.closeModal();
                        const obj = { [chainId]: [Object.assign({}, result)] };
                        this.onConfigSave(obj);
                        confirmationCallBack(true);
                        this.onDownload(obj);
                    }
                }
            };
            this.$eventBus = components_10.application.EventBus;
            this.registerEvent();
        }
        showImportJsonError(message) {
            this.importFileErrModal.visible = true;
            this.importFileErr.caption = message;
        }
        onConfirm() {
            if (this.isNew) {
                this.onDeployCampaign();
            }
            else {
                this.onSave();
            }
        }
        init() {
            super.init();
            this.stakingResult = new result_2.Result();
            this.appendChild(this.stakingResult);
        }
        render() {
            return (this.$render("i-panel", { class: "panel-config custom-scroll" },
                this.$render("i-panel", { id: "configCampaignsElm", margin: { left: 'auto', right: 'auto' }, width: "100%", maxWidth: 800 },
                    this.$render("i-hstack", { id: "backElm", gap: 4, width: "fit-content", margin: { top: 5, bottom: 15, left: 'auto' }, verticalAlignment: "center", class: "cursor-pointer", onClick: this.onBack },
                        this.$render("i-icon", { name: "arrow-left", fill: '#FFFFFF', width: 20, height: 20 }),
                        this.$render("i-label", { caption: "Back", font: { size: '20px', bold: true, color: '#FFFFFF' } })),
                    this.$render("i-hstack", { id: "networkElm", width: "100%", height: 150, verticalAlignment: "center", horizontalAlignment: "center" },
                        this.$render("i-label", { caption: "Please connect with your network!", font: { color: '#FFFFFF' } })),
                    this.$render("i-panel", { visible: false, id: "campaignElm", width: "100%" },
                        this.$render("i-vstack", { id: "wapperCampaignsButton", visible: store_7.isMultiple, verticalAlignment: "center" },
                            this.$render("i-hstack", { gap: 10, margin: { bottom: 10 }, width: "100%", verticalAlignment: "center", horizontalAlignment: "space-between", wrap: "wrap-reverse" },
                                this.$render("i-hstack", { id: "listCampaignButton", verticalAlignment: "center" }),
                                this.$render("i-button", { id: "btnAdd", class: "btn-os", margin: { left: 'auto' }, caption: "Add Campaigns", onClick: () => this.onAddCampaignByClick() }),
                                this.$render("i-label", { id: "importFileElm", visible: false }),
                                this.$render("i-modal", { id: "importFileErrModal", maxWidth: "100%", width: 420, title: "Import Campaign Error", closeIcon: { name: 'times' } },
                                    this.$render("i-vstack", { gap: 20, margin: { bottom: 10 }, verticalAlignment: "center", horizontalAlignment: "center" },
                                        this.$render("i-label", { id: "importFileErr", font: { size: '16px', color: '#fff' } }),
                                        this.$render("i-button", { caption: "Close", class: "btn-os btn-stake", width: 120, onClick: this.onClose })))),
                            this.$render("i-panel", { width: "100%", height: 2, margin: { bottom: 10 }, background: { color: '#6573c3' } })),
                        this.$render("i-hstack", { id: "wrapperNetworkElm", width: "100%", margin: { bottom: 10 }, verticalAlignment: "center", horizontalAlignment: "center" },
                            this.$render("i-label", { id: "lbNetworkName", font: { color: '#F15E61', size: '20px', bold: true } })),
                        this.$render("i-vstack", { gap: 10, verticalAlignment: "center", class: "main-content" },
                            this.$render("i-panel", { id: "pnlInfoElm" }),
                            this.$render("i-hstack", { horizontalAlignment: "center" },
                                this.$render("i-hstack", { id: "groupBtnSaveElm", gap: 10, margin: { top: 20 }, verticalAlignment: "center", horizontalAlignment: "center", wrap: "wrap" },
                                    this.$render("i-button", { id: "btnSave", caption: "Save", enabled: false, width: 200, maxWidth: "100%", class: "btn-os", onClick: this.onSave }),
                                    this.$render("i-button", { id: "btnDownload", caption: "Export JSON", enabled: false, width: 200, maxWidth: "100%", class: "btn-os", onClick: () => this.onDownload() })),
                                this.$render("i-hstack", { id: "groupBtnDeployElm", gap: 10, margin: { top: 10 }, verticalAlignment: "center", horizontalAlignment: "center", wrap: "wrap" },
                                    this.$render("i-vstack", { width: "100%", margin: { bottom: 10 }, verticalAlignment: "center", horizontalAlignment: "start" },
                                        this.$render("i-label", { caption: "Only the admin can deploy the campaign!", font: { size: '12px', color: '#f50057' } }),
                                        this.$render("i-label", { caption: "You need to confirm on your wallet for each staking/reward!", font: { size: '12px', color: '#f50057' } })),
                                    this.$render("i-button", { id: "btnExport", caption: "Export JSON", enabled: false, width: 200, maxWidth: "100%", class: "btn-os", onClick: () => this.onDownload() }),
                                    this.$render("i-button", { id: "btnDeployExport", caption: "Deploy & Export JSON", enabled: false, width: 300, maxWidth: "100%", rightIcon: { spin: true, visible: false, fill: '#FFFFFF' }, class: "btn-os", onClick: this.onDeployCampaign }))))))));
        }
    };
    PanelConfig = __decorate([
        components_10.customElements('panel-config')
    ], PanelConfig);
    exports.PanelConfig = PanelConfig;
});
define("@staking/main/panelConfig/index.tsx", ["require", "exports", "@staking/main/panelConfig/panel-config.tsx"], function (require, exports, panel_config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PanelConfig = void 0;
    Object.defineProperty(exports, "PanelConfig", { enumerable: true, get: function () { return panel_config_1.PanelConfig; } });
});
define("@staking/main/index.css.ts", ["require", "exports", "@ijstech/components", "@staking/assets", "@staking/store"], function (require, exports, components_11, assets_2, store_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    components_11.Styles.Theme.darkTheme.background.default = '#0c1234';
    const colorVar = {
        primaryButton: 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box',
        primaryGradient: 'linear-gradient(255deg,#f15e61,#b52082)',
        darkBg: '#181E3E 0% 0% no-repeat padding-box',
        primaryDisabled: 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box !important'
    };
    components_11.Styles.fontFace({
        fontFamily: "Apple SD Gothic Neo",
        src: `url("${assets_2.default.fullPath('fonts/FontsFree-Net-Apple-SD-Gothic-Neo-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Montserrat Regular",
        src: `url("${assets_2.default.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
        fontWeight: 'nomal',
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Montserrat Bold",
        src: `url("${assets_2.default.fullPath('fonts/montserrat/Montserrat-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Montserrat Light",
        src: `url("${assets_2.default.fullPath('fonts/montserrat/Montserrat-Light.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Montserrat Medium",
        src: `url("${assets_2.default.fullPath('fonts/montserrat/Montserrat-Medium.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Montserrat SemiBold",
        src: `url("${assets_2.default.fullPath('fonts/montserrat/Montserrat-SemiBold.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Raleway Regular",
        src: `url("${assets_2.default.fullPath('fonts/raleway/Raleway-Regular.ttf')}") format("truetype")`,
        fontWeight: 'nomal',
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Raleway Bold",
        src: `url("${assets_2.default.fullPath('fonts/raleway/Raleway-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Raleway Light",
        src: `url("${assets_2.default.fullPath('fonts/raleway/Raleway-Light.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Raleway Medium",
        src: `url("${assets_2.default.fullPath('fonts/raleway/Raleway-Medium.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_11.Styles.fontFace({
        fontFamily: "Raleway SemiBold",
        src: `url("${assets_2.default.fullPath('fonts/raleway/Raleway-SemiBold.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_11.Styles.cssRule('.staking-component', {
        $nest: {
            'i-label': {
                fontFamily: 'Raleway Regular',
            },
            'span': {
                letterSpacing: '0.15px',
            },
            '#stakingElm': {
                background: '#0c1234',
            },
            '.i-loading-overlay': {
                background: '#0c1234',
            },
            '.overflow-inherit': {
                overflow: 'inherit',
            },
            '::selection': {
                color: '#fff',
                background: '#1890ff'
            },
            '.btn-os': {
                background: colorVar.primaryButton,
                height: 'auto !important',
                color: '#fff',
                transition: 'background .3s ease',
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'Raleway Bold',
                $nest: {
                    'i-icon.loading-icon': {
                        marginInline: '0.25rem',
                        width: '16px !important',
                        height: '16px !important',
                    },
                },
            },
            '.btn-os:not(.disabled):not(.is-spinning):hover, .btn-os:not(.disabled):not(.is-spinning):focus': {
                background: colorVar.primaryGradient,
                backgroundColor: 'transparent',
                boxShadow: 'none',
                opacity: .9
            },
            '.btn-os:not(.disabled):not(.is-spinning):focus': {
                boxShadow: '0 0 0 0.2rem rgb(0 123 255 / 25%)'
            },
            '.btn-os.disabled, .btn-os.is-spinning': {
                background: colorVar.primaryDisabled,
                opacity: 1
            },
            '.dark-bg, .dark-modal > div > div': {
                background: colorVar.darkBg,
                borderRadius: 5
            },
            '.btn-transparent, .btn-transparent:not(.disabled):focus, .btn-transparent:not(.disabled):hover': {
                background: 'transparent',
                boxShadow: 'none',
                backgroundColor: 'transparent'
            },
            '.mr-0-5': {
                marginRight: '.5rem'
            },
            '.ml-0-5': {
                marginLeft: '.5rem'
            },
            '.mb-0-5': {
                marginBottom: '.5rem'
            },
            '.hidden': {
                display: 'none !important'
            },
            '.no-wrap': {
                whiteSpace: 'nowrap'
            },
            '.flex-nowrap': {
                flexWrap: 'nowrap',
            },
            '.py-1': {
                paddingTop: '1rem',
                paddingBottom: '1rem'
            },
            '.px-1': {
                paddingLeft: '1rem',
                paddingRight: '1rem'
            },
            '.align-middle': {
                alignItems: 'center'
            },
            '.staking-layout': {
                width: '100%',
                marginInline: 'auto',
                overflow: 'hidden',
            },
            'i-link': {
                display: 'flex',
                $nest: {
                    '&:hover *': {
                        color: '#fff',
                        opacity: 0.9,
                    },
                },
            },
            '.opacity-50': {
                opacity: 0.5
            },
            '.cursor-default': {
                cursor: 'default',
            },
            '.text-overflow': {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
            '.wrapper': {
                width: '100%',
                height: '100%',
                maxWidth: store_8.maxWidth,
                maxHeight: store_8.maxHeight,
                $nest: {
                    '.sticker': {
                        position: 'absolute',
                        top: '-8px',
                        right: '-33px',
                        borderInline: '50px solid transparent',
                        borderBottom: '50px solid #20bf55',
                        transform: 'rotate(45deg)',
                        $nest: {
                            '&.sold-out': {
                                borderBottomColor: '#ccc',
                            },
                            '&.closed': {
                                borderBottomColor: '#0c1234',
                                $nest: {
                                    'i-label > *': {
                                        color: '#f7d064 !important',
                                    },
                                    'i-icon': {
                                        fill: '#f7d064',
                                    },
                                }
                            },
                            '.sticker-text': {
                                position: 'absolute',
                                right: '-1.6rem',
                                top: '0.75rem',
                                width: '50px',
                                lineHeight: '1rem',
                            },
                            'i-label': {
                                display: 'flex',
                                justifyContent: 'center',
                            },
                            'i-label > *': {
                                color: '#3f3f42 !important',
                                fontSize: '0.75rem',
                            },
                            'i-icon': {
                                width: '14px',
                                height: '14px',
                                display: 'block',
                                margin: 'auto',
                            },
                        },
                    },
                    '.custom-timer': {
                        display: 'flex',
                        $nest: {
                            '.timer-value': {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 4,
                                paddingInline: 4,
                                minWidth: 20,
                                height: 20,
                                fontSize: 14,
                                fontFamily: 'Montserrat Regular',
                            },
                            '.timer-unit': {
                                display: 'flex',
                                alignItems: 'center',
                            },
                        },
                    },
                    '.bg-color': {
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#fff',
                        minHeight: '485px',
                        height: '100%',
                        borderRadius: '15px',
                        paddingBottom: '1rem',
                        position: 'relative',
                    },
                    '.btn-stake': {
                        width: 370,
                        maxWidth: '100%',
                        padding: '0.625rem 0',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        borderRadius: 12,
                    },
                    '.no-campaign': {
                        padding: '3rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        justifyContent: 'center',
                        $nest: {
                            'i-label > *': {
                                fontSize: '1.5rem',
                                marginTop: '1rem',
                            }
                        }
                    },
                    '.slider-arrow': {
                        fill: '#f15e61',
                    }
                },
            },
            '.ml-auto': {
                marginLeft: 'auto',
            },
            '.mr-025': {
                marginRight: '0.25rem',
            },
            '.input-disabled': {
                opacity: 0.4,
                cursor: 'default',
                $nest: {
                    '*': {
                        cursor: 'default',
                    }
                }
            },
            '#importFileErrModal': {
                $nest: {
                    '.modal': {
                        borderRadius: 12,
                    },
                    '.i-modal_header': {
                        marginBottom: '1.5rem',
                        paddingBottom: '0.5rem',
                        borderBottom: `2px solid #F15E61`,
                        color: '#F15E61',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                    },
                    '.i-modal_header > i-icon': {
                        fill: `#F15E61 !important`
                    },
                    '#importFileErr span': {
                        fontSize: '16px !important'
                    }
                }
            },
            '#loadingElm.i-loading--active': {
                marginTop: '2rem',
                position: 'initial',
                $nest: {
                    '#stakingElm': {
                        display: 'none !important',
                    },
                    '.i-loading-spinner': {
                        marginTop: '2rem',
                    },
                },
            },
            '.connect-wallet': {
                display: 'block',
                textAlign: 'center',
                paddingTop: '1rem',
            },
        }
    });
});
define("@staking/main", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/assets", "@staking/global", "@staking/store", "@staking/staking-utils", "@staking/result", "@staking/main/manageStake/index.tsx", "@staking/main/panelConfig/index.tsx", "@validapp/time-is-money-sdk", "@ijstech/eth-contract", "@staking/main/index.css.ts"], function (require, exports, components_12, eth_wallet_7, assets_3, global_7, store_9, staking_utils_3, result_3, index_3, index_4, time_is_money_sdk_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StakingBlock = void 0;
    components_12.Styles.Theme.applyTheme(components_12.Styles.Theme.darkTheme);
    let StakingBlock = class StakingBlock extends components_12.Module {
        constructor(parent, options) {
            super(parent, options);
            this.campaigns = [];
            this.listAprTimer = [];
            this.listActiveTimer = [];
            this.tokenMap = {};
            this.isImportNewCampaign = false;
            this.initInputFile = (importFileElm) => {
                var _a;
                importFileElm.caption = '<input type="file" accept=".json" />';
                const inputElm = (_a = importFileElm.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild;
                if (inputElm) {
                    inputElm.onchange = (event) => {
                        const reader = new FileReader();
                        const files = event.target.files;
                        if (!files.length) {
                            return;
                        }
                        const file = files[0];
                        reader.readAsBinaryString(file);
                        reader.onload = (event) => {
                            const { loaded, total } = event;
                            const isCompleted = loaded === total;
                            if (isCompleted) {
                                this.initInputFile(importFileElm);
                                this.convertJSONToObj(reader.result);
                            }
                        };
                    };
                }
            };
            this.setEnableImportButton = (enabled) => {
                this.btnAddNew.enabled = enabled;
                this.btnImportNew.enabled = enabled;
                this.btnImportExisting.enabled = enabled;
                this.btnImportExisting.rightIcon.visible = !enabled;
            };
            this.convertJSONToObj = async (result) => {
                if (!result)
                    this.showImportJsonError('Data is corrupted. No data were recovered.');
                try {
                    const obj = JSON.parse(result);
                    const length = Object.keys(obj).length;
                    const chainId = store_9.getChainId();
                    const campaignObj = obj[chainId];
                    const network = store_9.getNetworkInfo(chainId);
                    if (!length) {
                        this.showImportJsonError('No data found in the imported file.');
                    }
                    else if (this.isImportNewCampaign && !campaignObj) {
                        this.showImportJsonError(`No data found in ${network === null || network === void 0 ? void 0 : network.name} network.`);
                    }
                    else {
                        if (this.isImportNewCampaign) {
                            const data = { [chainId]: [campaignObj[0]] };
                            this.onEditCampaign(true, data);
                        }
                        else {
                            this.setEnableImportButton(false);
                            const info = await staking_utils_3.getAllCampaignsInfo(obj, true);
                            this.setEnableImportButton(true);
                            if (!info || !info.length) {
                                this.showImportJsonError(`No data found in ${network === null || network === void 0 ? void 0 : network.name} network.`);
                            }
                            else {
                                this.onEditCampaign(false, { [chainId]: info });
                            }
                        }
                    }
                }
                catch (_a) {
                    this.showImportJsonError('Data is corrupted. No data were recovered.');
                }
            };
            this.registerEvent = () => {
                this.$eventBus.register(this, "isWalletConnected" /* IsWalletConnected */, this.onWalletConnect);
                this.$eventBus.register(this, "IsWalletDisconnected" /* IsWalletDisconnected */, this.onWalletConnect);
                this.$eventBus.register(this, "chainChanged" /* chainChanged */, this.onChainChange);
                this.$eventBus.register(this, "emitButtonStatus" /* EmitButtonStatus */, this.updateButtonStatus);
            };
            this.onWalletConnect = async (connected) => {
                this.onSetupPage(connected);
            };
            this.onChainChange = async () => {
                const isConnected = store_9.isWalletConnected();
                if (await this.isWalletValid(isConnected)) {
                    this.onSetupPage(isConnected);
                }
            };
            this.isWalletValid = async (isConnected) => {
                var _a;
                if (this.data && isConnected) {
                    try {
                        const wallet = eth_wallet_7.Wallet.getInstance();
                        const infoList = this.data[wallet.chainId];
                        const stakingAddress = infoList && ((_a = infoList[0].stakings[0]) === null || _a === void 0 ? void 0 : _a.address);
                        if (stakingAddress) {
                            const timeIsMoney = new time_is_money_sdk_1.Contracts.TimeIsMoney(wallet, stakingAddress);
                            await timeIsMoney.getCredit(wallet.address);
                        }
                        return true;
                    }
                    catch (_b) {
                        return false;
                    }
                }
                return false;
            };
            this.initWalletData = async () => {
                let accountsChangedEventHandler = async (account) => {
                    store_9.setTokenMap();
                };
                let chainChangedEventHandler = async (hexChainId) => {
                    store_9.setTokenMap();
                };
                let selectedProvider = localStorage.getItem('walletProvider');
                if (!selectedProvider && store_9.hasMetaMask()) {
                    selectedProvider = eth_wallet_7.WalletPlugin.MetaMask;
                }
                const isValidProvider = Object.values(eth_wallet_7.WalletPlugin).includes(selectedProvider);
                if (!eth_wallet_7.Wallet.getInstance().chainId) {
                    eth_wallet_7.Wallet.getInstance().chainId = store_9.getDefaultChainId();
                }
                if (store_9.hasWallet() && isValidProvider) {
                    await store_9.connectWallet(selectedProvider, {
                        'accountsChanged': accountsChangedEventHandler,
                        'chainChanged': chainChangedEventHandler
                    });
                }
            };
            this.onSetupPage = async (connected, hideLoading) => {
                if (!hideLoading && this.loadingElm) {
                    this.loadingElm.visible = true;
                }
                if (!connected || !this.data) {
                    await this.renderEmpty();
                    return;
                }
                this.campaigns = await staking_utils_3.getAllCampaignsInfo(this.data);
                await this.renderCampaigns(hideLoading);
                if (!hideLoading && this.loadingElm) {
                    this.loadingElm.visible = false;
                }
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
            this.onClaim = async (btnClaim, data) => {
                this.showResultMessage(this.stakingResult, 'warning', `Claim ${data.rewardSymbol}`);
                const callBack = async (err, reply) => {
                    if (err) {
                        this.showResultMessage(this.stakingResult, 'error', err);
                    }
                    else {
                        this.showResultMessage(this.stakingResult, 'success', reply);
                        btnClaim.enabled = false;
                        btnClaim.rightIcon.visible = true;
                    }
                };
                const confirmationCallBack = async (receipt) => {
                    await this.onSetupPage(store_9.isWalletConnected(), true);
                    if (!btnClaim)
                        return;
                    btnClaim.rightIcon.visible = false;
                    btnClaim.enabled = true;
                };
                global_7.registerSendTxEvents({
                    transactionHash: callBack,
                    confirmation: confirmationCallBack
                });
                staking_utils_3.claimToken(data.reward.address, callBack);
            };
            this.removeTimer = () => {
                for (const timer of this.listAprTimer) {
                    clearInterval(timer);
                }
                this.listAprTimer = [];
                for (const timer of this.listActiveTimer) {
                    clearInterval(timer);
                }
                this.listActiveTimer = [];
            };
            this.getRewardToken = (tokenAddress) => {
                return this.tokenMap[tokenAddress] || this.tokenMap[tokenAddress === null || tokenAddress === void 0 ? void 0 : tokenAddress.toLocaleLowerCase()] || {};
            };
            this.getLPToken = (campaign, token, chainId) => {
                if (campaign.getTokenURL) {
                    window.open(campaign.getTokenURL);
                }
                else {
                    window.open(store_9.getTokenUrl ? store_9.getTokenUrl : `#/swap?chainId=${chainId}&fromToken=BNB&toToken=${token}&fromAmount=1&showOptimizedRoutes=false`);
                }
            };
            this.init = async () => {
                super.init();
                const body = this.closest('body');
                if (body) {
                    body.style.overflow = 'auto !important';
                }
                this.pnlConfig = new index_4.PanelConfig();
                this.pnlConfig.visible = false;
                this.pnlConfig.onConfigSave = (campaign) => this.onConfigSave(campaign);
                this.pnlConfig.onReset = () => {
                    this.pnlConfig.visible = false;
                    this.stakingLayout.visible = true;
                };
                this.stakingComponent.appendChild(this.pnlConfig);
                this.stakingResult = new result_3.Result();
                this.stakingComponent.appendChild(this.stakingResult);
                this.stakingResult.visible = false;
                this.showResultMessage(this.stakingResult, 'warning', '');
                setTimeout(() => {
                    this.stakingResult.closeModal();
                    this.stakingResult.visible = true;
                }, 100);
                this.initWalletData();
                store_9.setDataFromSCConfig(store_9.Networks, store_9.InfuraId);
                store_9.setCurrentChainId(store_9.getDefaultChainId());
                if (!this.data) {
                    await this.renderEmpty();
                }
            };
            this.updateButtonStatus = async (data) => {
                var _a;
                if (data) {
                    const { value, key, text } = data;
                    const elm = (_a = this.stakingElm) === null || _a === void 0 ? void 0 : _a.querySelector(key);
                    if (elm) {
                        elm.rightIcon.visible = value;
                        elm.caption = text;
                    }
                }
            };
            this.getBtnText = (key, text) => {
                const data = store_9.getStakingStatus(key);
                if (data.value) {
                    return data.text;
                }
                return text;
            };
            this.initEmptyUI = async () => {
                if (!this.noCampaignSection) {
                    this.noCampaignSection = await components_12.Panel.create({ height: '100%' });
                }
                const isConnected = store_9.isWalletConnected();
                const isBtnShown = !this.data && isConnected;
                let importFileElm;
                let onImportCampaign;
                let onClose;
                if (isBtnShown) {
                    importFileElm = await components_12.Label.create({ visible: false });
                    onImportCampaign = (isNew) => {
                        var _a, _b;
                        this.isImportNewCampaign = isNew;
                        (_b = (_a = importFileElm.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.click();
                    };
                    onClose = () => {
                        this.importFileErrModal.visible = false;
                    };
                    this.initInputFile(importFileElm);
                }
                this.noCampaignSection.clearInnerHTML();
                this.noCampaignSection.appendChild(this.$render("i-panel", { class: "no-campaign", height: "100%", background: { color: '#192046' } },
                    this.$render("i-vstack", { gap: 10, verticalAlignment: "center" },
                        this.$render("i-image", { url: assets_3.default.fullPath('img/staking/TrollTrooper.svg') }),
                        this.$render("i-label", { font: { color: '#FFFFFF' }, caption: isConnected ? 'No Campaigns' : 'Please connect with your wallet!' }),
                        isBtnShown ? (this.$render("i-hstack", { gap: 10, margin: { top: 10 }, verticalAlignment: "center", horizontalAlignment: "center" },
                            this.$render("i-button", { id: "btnAddNew", maxWidth: 220, caption: "Add New Campaign", class: "btn-os btn-stake", font: { size: '14px' }, onClick: () => this.onEditCampaign(true) }),
                            this.$render("i-button", { id: "btnImportNew", maxWidth: 220, caption: "Import New Campaign", class: "btn-os btn-stake", font: { size: '14px' }, onClick: () => onImportCampaign(true) }),
                            this.$render("i-button", { id: "btnImportExisting", maxWidth: 220, caption: "Import Existing Campaign", class: "btn-os btn-stake", font: { size: '14px' }, rightIcon: { visible: false, spin: true, fill: '#fff' }, onClick: () => onImportCampaign(false) }),
                            importFileElm,
                            this.$render("i-modal", { id: "importFileErrModal", maxWidth: "100%", width: 420, title: "Import Campaign Error", closeIcon: { name: 'times' } },
                                this.$render("i-vstack", { gap: 20, margin: { bottom: 10 }, verticalAlignment: "center", horizontalAlignment: "center" },
                                    this.$render("i-label", { id: "importFileErr", font: { size: '16px', color: '#fff' } }),
                                    this.$render("i-button", { caption: "Close", class: "btn-os btn-stake", width: 120, onClick: onClose }))))) : [])));
                this.noCampaignSection.visible = true;
            };
            this.renderEmpty = async () => {
                await this.initEmptyUI();
                if (this.stakingElm) {
                    this.stakingElm.clearInnerHTML();
                    this.stakingElm.appendChild(this.noCampaignSection);
                }
                if (this.loadingElm) {
                    this.loadingElm.visible = false;
                }
            };
            this.renderCampaigns = async (hideLoading) => {
                if (!hideLoading) {
                    this.stakingElm.clearInnerHTML();
                }
                this.tokenMap = store_9.getTokenMap();
                const chainId = store_9.getChainId();
                const network = store_9.getNetworkInfo(chainId);
                await this.initEmptyUI();
                this.noCampaignSection.visible = false;
                if (this.campaigns && !this.campaigns.length) {
                    this.stakingElm.clearInnerHTML();
                    this.stakingElm.appendChild(this.noCampaignSection);
                    this.noCampaignSection.visible = true;
                    this.removeTimer();
                    return;
                }
                const currentAddress = eth_wallet_7.Wallet.getInstance().address;
                let nodeItems = [];
                this.removeTimer();
                const campaigns = [this.campaigns[0]];
                for (let idx = 0; idx < campaigns.length; idx++) {
                    const campaign = this.campaigns[idx];
                    const colorCampaignLine = store_9.isThemeApplied ? campaign.customColorCampaign || '#0000001f' : '#0000001f';
                    const colorCampaignText = store_9.isThemeApplied ? campaign.customColorCampaign || '#f15e61' : '#f15e61';
                    const colorCampaignBackground = store_9.isThemeApplied ? campaign.customColorBackground || '#ffffff26' : '#ffffff26';
                    const colorStakingBackground = store_9.isThemeApplied ? campaign.customColorStakingBackground || '#ffffff07' : '#ffffff07';
                    const colorButton = store_9.isThemeApplied ? campaign.customColorButton : undefined;
                    const colorText = store_9.isThemeApplied ? campaign.customColorText || '#fff' : '#fff';
                    const colorTimeBackground = store_9.isThemeApplied ? campaign.customColorTimeBackground || '#F15E61' : '#F15E61';
                    const containerSection = await components_12.Panel.create();
                    containerSection.id = `campaign-${idx}`;
                    const options = campaign.options;
                    for (let optIdx = 0; optIdx < options.length; optIdx++) {
                        const opt = options[optIdx];
                        let lpTokenData = {};
                        let vaultTokenData = {};
                        if (opt.tokenAddress) {
                            if (opt.lockTokenType == store_9.LockTokenType.LP_Token) {
                                lpTokenData = {
                                    'object': await staking_utils_3.getLPObject(opt.tokenAddress)
                                };
                            }
                            else if (opt.lockTokenType == store_9.LockTokenType.VAULT_Token) {
                                vaultTokenData = {
                                    'object': await staking_utils_3.getVaultObject(opt.tokenAddress)
                                };
                            }
                        }
                        const tokenInfo = {
                            tokenAddress: campaign.tokenAddress,
                            lpToken: lpTokenData,
                            vaultToken: vaultTokenData
                        };
                        options[optIdx] = Object.assign(Object.assign({}, options[optIdx]), { tokenInfo });
                    }
                    const stakingInfo = options ? options[0] : null;
                    const lockedTokenObject = store_9.getLockedTokenObject(stakingInfo, stakingInfo.tokenInfo, this.tokenMap);
                    const lockedTokenSymbol = store_9.getLockedTokenSymbol(stakingInfo, lockedTokenObject);
                    const lockedTokenIconPaths = store_9.getLockedTokenIconPaths(stakingInfo, lockedTokenObject, chainId, this.tokenMap);
                    const lockedTokenDecimals = (lockedTokenObject === null || lockedTokenObject === void 0 ? void 0 : lockedTokenObject.decimals) || 18;
                    const defaultDecimalsOffset = 18 - lockedTokenDecimals;
                    const activeStartTime = stakingInfo ? stakingInfo.startOfEntryPeriod : 0;
                    const activeEndTime = stakingInfo ? stakingInfo.endOfEntryPeriod : 0;
                    let isStarted = components_12.moment(activeStartTime).diff(components_12.moment()) <= 0;
                    let isClosed = components_12.moment(activeEndTime).diff(components_12.moment()) <= 0;
                    let totalLocked = {};
                    const stakingElms = [];
                    const optionTimer = { background: { color: colorTimeBackground }, font: { color: colorText } };
                    const activeTimerRows = [];
                    const activeTimerElms = [];
                    const endHours = [];
                    const endDays = [];
                    const endMins = [];
                    const stickerSections = [];
                    const stickerLabels = [];
                    const stickerIcons = [];
                    for (let i = 0; i < options.length; i++) {
                        stakingElms[i] = await components_12.VStack.create({ visible: i === 0 });
                        activeTimerRows[i] = await components_12.VStack.create({ gap: 2, width: '25%', verticalAlignment: 'center' });
                        activeTimerElms[i] = await components_12.VStack.create();
                        activeTimerRows[i].appendChild(this.$render("i-label", { caption: "End Date", font: { size: '14px', color: colorText }, class: "opacity-50" }));
                        activeTimerRows[i].appendChild(activeTimerElms[i]);
                        endHours[i] = await components_12.Label.create(optionTimer);
                        endDays[i] = await components_12.Label.create(optionTimer);
                        endMins[i] = await components_12.Label.create(optionTimer);
                        endHours[i].classList.add('timer-value');
                        endDays[i].classList.add('timer-value');
                        endMins[i].classList.add('timer-value');
                        activeTimerElms[i].appendChild(this.$render("i-hstack", { gap: 4, class: "custom-timer" },
                            endDays[i],
                            this.$render("i-label", { caption: "D", class: "timer-unit", font: { color: colorText } }),
                            endHours[i],
                            this.$render("i-label", { caption: "H", class: "timer-unit", font: { color: colorText } }),
                            endMins[i],
                            this.$render("i-label", { caption: "M", class: "timer-unit", font: { color: colorText } })));
                        // Sticker
                        stickerSections[i] = await components_12.Panel.create({ visible: false });
                        stickerLabels[i] = await components_12.Label.create();
                        stickerIcons[i] = await components_12.Icon.create();
                        stickerSections[i].classList.add('sticker');
                        stickerSections[i].appendChild(this.$render("i-vstack", { class: "sticker-text" },
                            stickerIcons[i],
                            stickerLabels[i]));
                    }
                    const onChangeStake = (index) => {
                        stakingElms.forEach((elm) => {
                            elm.visible = false;
                        });
                        stakingElms[index].visible = true;
                    };
                    const setAvailableQty = async () => {
                        if (!store_9.isWalletConnected())
                            return;
                        let i = 0;
                        for (const o of options) {
                            const _totalLocked = await staking_utils_3.getStakingTotalLocked(o.address);
                            totalLocked[o.address] = _totalLocked;
                            const optionQty = new eth_wallet_7.BigNumber(o.maxTotalLock).minus(_totalLocked).shiftedBy(defaultDecimalsOffset);
                            if (o.mode === 'Stake') {
                                const keyStake = `#btn-stake-${o.address}`;
                                const btnStake = this.querySelector(keyStake);
                                const isStaking = store_9.getStakingStatus(keyStake).value;
                                if (btnStake) {
                                    let isValidInput = false;
                                    const inputElm = this.querySelector(`#input-${o.address}`);
                                    if (inputElm) {
                                        const manageStake = this.querySelector(`#manage-stake-${o.address}`);
                                        const inputVal = new eth_wallet_7.BigNumber(inputElm.value || 0);
                                        isValidInput = inputVal.gt(0) && inputVal.lte(manageStake.getBalance()) && !(manageStake === null || manageStake === void 0 ? void 0 : manageStake.needToBeApproval());
                                    }
                                    btnStake.enabled = !isStaking && isValidInput && (isStarted && !(optionQty.lte(0) || isClosed));
                                }
                            }
                            else {
                                const keyUnstake = `#btn-unstake-${o.address}`;
                                const btnUnstake = this.querySelector(keyUnstake);
                                const isUnstaking = store_9.getStakingStatus(keyUnstake).value;
                                if (btnUnstake) {
                                    const manageStake = this.querySelector(`#manage-stake-${o.address}`);
                                    btnUnstake.enabled = !isUnstaking && o.mode !== 'Stake' && Number(o.stakeQty) != 0 && !(manageStake === null || manageStake === void 0 ? void 0 : manageStake.needToBeApproval());
                                }
                            }
                            if (isClosed) {
                                if (stickerLabels[i].caption !== 'Closed') {
                                    stickerSections[i].classList.add('closed');
                                    stickerSections[i].classList.remove('sold-out');
                                    stickerLabels[i].caption = 'Closed';
                                    stickerIcons[i].name = 'check-square';
                                }
                            }
                            else if (optionQty.lte(0)) {
                                if (stickerLabels[i].caption !== 'Sold Out') {
                                    stickerLabels[i].caption = 'Sold Out';
                                    stickerIcons[i].name = 'star';
                                    stickerSections[i].classList.add('sold-out');
                                }
                            }
                            else {
                                if (stickerLabels[i].caption !== 'Active') {
                                    stickerLabels[i].caption = 'Active';
                                    stickerIcons[i].name = 'star';
                                }
                            }
                            if (!stickerSections[i].visible) {
                                stickerSections[i].visible = true;
                            }
                            i++;
                        }
                        ;
                    };
                    const setEndRemainingTime = () => {
                        isStarted = components_12.moment(activeStartTime).diff(components_12.moment()) <= 0;
                        isClosed = components_12.moment(activeEndTime).diff(components_12.moment()) <= 0;
                        for (let i = 0; i < options.length; i++) {
                            activeTimerRows[i].visible = isStarted && !isClosed;
                        }
                        if (activeEndTime == 0) {
                            for (let i = 0; i < options.length; i++) {
                                endDays[i].caption = endHours[i].caption = endMins[i].caption = '0';
                            }
                            if (this.listActiveTimer[idx]) {
                                clearInterval(this.listActiveTimer[idx]);
                            }
                        }
                        else {
                            const days = components_12.moment(activeEndTime).diff(components_12.moment(), 'days');
                            const hours = components_12.moment(activeEndTime).diff(components_12.moment(), 'hours') - days * 24;
                            const mins = components_12.moment(activeEndTime).diff(components_12.moment(), 'minutes') - days * 24 * 60 - hours * 60;
                            for (let i = 0; i < options.length; i++) {
                                endDays[i].caption = `${days}`;
                                endHours[i].caption = `${hours}`;
                                endMins[i].caption = `${mins}`;
                            }
                        }
                    };
                    const setTimer = () => {
                        setEndRemainingTime();
                        setAvailableQty();
                    };
                    setTimer();
                    this.listActiveTimer.push(setInterval(setTimer, 2000));
                    const stakingsElm = await Promise.all(options.map(async (option, optionIdx) => {
                        const manageStake = new index_3.ManageStake();
                        manageStake.id = `manage-stake-${option.address}`;
                        manageStake.width = '100%';
                        manageStake.onRefresh = () => this.onSetupPage(store_9.isWalletConnected(), true);
                        this.manageStakeElm.clearInnerHTML();
                        this.manageStakeElm.appendChild(manageStake);
                        manageStake.setData(Object.assign(Object.assign({}, campaign), option));
                        const isClaim = option.mode === 'Claim';
                        const rewardsData = [option.rewardsData[0]];
                        const rewardOptions = !isClaim ? rewardsData : [];
                        let aprInfo = {};
                        const claimStakedRow = await components_12.HStack.create({ verticalAlignment: 'center', horizontalAlignment: 'space-between' });
                        claimStakedRow.appendChild(this.$render("i-label", { caption: "You Staked", font: { size: '16px', color: colorText } }));
                        claimStakedRow.appendChild(this.$render("i-label", { caption: `${global_7.formatNumber(new eth_wallet_7.BigNumber(option.stakeQty).shiftedBy(defaultDecimalsOffset))} ${lockedTokenSymbol}`, font: { size: '16px', name: 'Montserrat Regular', color: colorText } }));
                        const rowRewards = await components_12.VStack.create({ gap: 8, verticalAlignment: 'center' });
                        for (let idx = 0; idx < rewardsData.length; idx++) {
                            const reward = rewardsData[idx];
                            const rewardToken = this.getRewardToken(reward.rewardTokenAddress);
                            const rewardTokenDecimals = rewardToken.decimals || 18;
                            let decimalsOffset = 18 - rewardTokenDecimals;
                            let rewardLockedDecimalsOffset = decimalsOffset;
                            if (rewardTokenDecimals !== 18 && lockedTokenDecimals !== 18) {
                                rewardLockedDecimalsOffset = decimalsOffset * 2;
                            }
                            else if (lockedTokenDecimals !== 18 && rewardTokenDecimals === 18) {
                                rewardLockedDecimalsOffset = rewardTokenDecimals - lockedTokenDecimals;
                                decimalsOffset = 18 - lockedTokenDecimals;
                            }
                            const rewardSymbol = rewardToken.symbol || '';
                            rowRewards.appendChild(this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                this.$render("i-label", { caption: `${rewardSymbol} Locked`, font: { size: '16px', color: colorText } }),
                                this.$render("i-label", { caption: `${global_7.formatNumber(new eth_wallet_7.BigNumber(reward.vestedReward || 0).shiftedBy(rewardLockedDecimalsOffset))} ${rewardSymbol}`, font: { size: '16px', name: 'Montserrat Regular', color: colorText } })));
                            // rowRewards.appendChild(
                            // 	<i-hstack horizontalAlignment="space-between">
                            // 		<i-label caption={`${rewardSymbol} Vesting Start`} font={{ size: '16px', color: colorText }} />
                            // 		<i-label caption={reward.vestingStart ? reward.vestingStart.format('YYYY-MM-DD HH:mm:ss') : 'TBC'} font={{ size: '16px', color: colorText }} />
                            // 	</i-hstack>
                            // );
                            // rowRewards.appendChild(
                            // 	<i-hstack horizontalAlignment="space-between">
                            // 		<i-label caption={`${rewardSymbol} Vesting End`} font={{ size: '16px', color: colorText }} />
                            // 		<i-label caption={reward.vestingEnd ? reward.vestingEnd.format('YYYY-MM-DD HH:mm:ss') : 'TBC'} font={{ size: '16px', color: colorText }} />
                            // 	</i-hstack>
                            // );
                            const passClaimStartTime = !(reward.claimStartTime && components_12.moment().diff(components_12.moment.unix(reward.claimStartTime)) < 0);
                            let rewardClaimable = `0 ${rewardSymbol}`;
                            if (passClaimStartTime && isClaim) {
                                rewardClaimable = `${global_7.formatNumber(new eth_wallet_7.BigNumber(reward.claimable).shiftedBy(decimalsOffset))} ${rewardSymbol}`;
                            }
                            let startClaimingText = '';
                            if (!(!reward.claimStartTime || passClaimStartTime) && isClaim) {
                                const claimStart = components_12.moment.unix(reward.claimStartTime).format('YYYY-MM-DD HH:mm:ss');
                                startClaimingText = `(Claim ${rewardSymbol} after ${claimStart})`;
                            }
                            rowRewards.appendChild(this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                this.$render("i-label", { caption: `${rewardSymbol} Claimable`, font: { size: '16px', color: colorText } }),
                                this.$render("i-label", { caption: rewardClaimable, font: { size: '16px', name: 'Montserrat Regular', color: colorText } }),
                                startClaimingText ? this.$render("i-label", { caption: startClaimingText, font: { size: '16px', color: colorText } }) : []));
                            const btnClaim = await components_12.Button.create({
                                rightIcon: { spin: true, fill: colorText, visible: false },
                                caption: `Claim ${rewardSymbol}`,
                                background: { color: `${colorButton} !important` },
                                font: { color: colorText },
                                enabled: !(!passClaimStartTime || new eth_wallet_7.BigNumber(reward.claimable).isZero()) && isClaim,
                                margin: { left: 'auto', right: 'auto' }
                            });
                            btnClaim.id = `btnClaim-${idx}-${option.address}`;
                            btnClaim.classList.add('btn-os', 'btn-stake');
                            btnClaim.onClick = () => this.onClaim(btnClaim, { reward, rewardSymbol });
                            rowRewards.appendChild(btnClaim);
                        }
                        ;
                        const getAprValue = (rewardOption) => {
                            if (rewardOption && aprInfo && aprInfo[rewardOption.rewardTokenAddress]) {
                                const apr = new eth_wallet_7.BigNumber(aprInfo[rewardOption.rewardTokenAddress]).times(100).toFormat(2, eth_wallet_7.BigNumber.ROUND_DOWN);
                                return `${apr}%`;
                            }
                            return '';
                        };
                        const durationDays = option.minLockTime / (60 * 60 * 24);
                        const _lockedTokenObject = store_9.getLockedTokenObject(option, option.tokenInfo, this.tokenMap);
                        const _lockedTokenIconPaths = store_9.getLockedTokenIconPaths(option, _lockedTokenObject, chainId, this.tokenMap);
                        const pathsLength = _lockedTokenIconPaths.length;
                        const rewardToken = this.getRewardToken(rewardsData[0].rewardTokenAddress);
                        const rewardIconPath = store_9.getTokenIconPath(rewardToken, chainId);
                        stakingElms[optionIdx].appendChild(this.$render("i-vstack", { gap: 16, width: store_9.maxWidth, height: "100%", padding: { top: 10, bottom: 10, left: 20, right: 20 }, position: "relative" },
                            stickerSections[optionIdx],
                            this.$render("i-hstack", { gap: 10, width: "100%", verticalAlignment: "center" },
                                this.$render("i-hstack", { gap: 10, width: "50%" },
                                    this.$render("i-hstack", { width: pathsLength === 1 ? 63.5 : 80, position: "relative", verticalAlignment: "center" },
                                        this.$render("i-image", { width: 60, height: 60, url: assets_3.default.fullPath(rewardIconPath), fallbackUrl: store_9.fallBackUrl }),
                                        _lockedTokenIconPaths.map((v, idxImg) => {
                                            return this.$render("i-image", { position: "absolute", width: 28, height: 28, bottom: 0, left: (idxImg * 20) + 35, url: assets_3.default.fullPath(v), fallbackUrl: store_9.fallBackUrl });
                                        })),
                                    this.$render("i-vstack", { gap: 2, overflow: { x: 'hidden' }, verticalAlignment: "center" },
                                        this.$render("i-label", { visible: !!campaign.customName, caption: campaign.customName, font: { size: '20px', name: 'Montserrat Bold', color: colorCampaignText, bold: true }, class: "text-overflow" }),
                                        this.$render("i-label", { visible: !!campaign.customDesc, caption: campaign.customDesc, font: { size: '16px', name: 'Montserrat Regular', color: colorText }, class: "opacity-50 text-overflow" }))),
                                await Promise.all(rewardOptions.map(async (rewardOption, idx) => {
                                    const lbApr = await components_12.Label.create({ font: { size: '40px', name: 'Montserrat Medium', color: '#72F35D' } });
                                    const lbRate = await components_12.Label.create({ font: { size: '16px', name: 'Montserrat Regular', color: colorText } });
                                    lbApr.classList.add('text-overflow');
                                    lbRate.classList.add('opacity-50');
                                    const rewardToken = this.getRewardToken(rewardOption.rewardTokenAddress);
                                    const rewardTokenDecimals = rewardToken.decimals || 18;
                                    const decimalsOffset = 18 - rewardTokenDecimals;
                                    const lockTokenType = option.lockTokenType;
                                    const rateDesc = `1 ${lockTokenType === store_9.LockTokenType.LP_Token ? 'LP' : store_9.tokenSymbol(option.lockTokenAddress)} : ${new eth_wallet_7.BigNumber(rewardOption.multiplier).shiftedBy(decimalsOffset).toFixed()} ${store_9.tokenSymbol(rewardOption.rewardTokenAddress)}`;
                                    const updateApr = async () => {
                                        var _a, _b, _c, _d;
                                        if (lockTokenType === store_9.LockTokenType.ERC20_Token) {
                                            const apr = await staking_utils_3.getERC20RewardCurrentAPR(rewardOption, lockedTokenObject, durationDays);
                                            if (!isNaN(parseFloat(apr))) {
                                                aprInfo[rewardOption.rewardTokenAddress] = apr;
                                            }
                                        }
                                        else if (lockTokenType === store_9.LockTokenType.LP_Token) {
                                            if (rewardOption.referencePair) {
                                                aprInfo[rewardOption.rewardTokenAddress] = await staking_utils_3.getLPRewardCurrentAPR(rewardOption, (_b = (_a = option.tokenInfo) === null || _a === void 0 ? void 0 : _a.lpToken) === null || _b === void 0 ? void 0 : _b.object, durationDays);
                                            }
                                        }
                                        else {
                                            aprInfo[rewardOption.rewardTokenAddress] = await staking_utils_3.getVaultRewardCurrentAPR(rewardOption, (_d = (_c = option.tokenInfo) === null || _c === void 0 ? void 0 : _c.vaultToken) === null || _d === void 0 ? void 0 : _d.object, durationDays);
                                        }
                                        const aprValue = getAprValue(rewardOption);
                                        lbApr.caption = `APR ${aprValue}`;
                                        lbRate.caption = rateDesc;
                                    };
                                    updateApr();
                                    this.listAprTimer.push(setInterval(updateApr, 10000));
                                    const aprValue = getAprValue(rewardOption);
                                    lbApr.caption = `APR ${aprValue}`;
                                    lbRate.caption = rateDesc;
                                    return this.$render("i-vstack", { verticalAlignment: "center" },
                                        lbApr,
                                        lbRate);
                                }))),
                            this.$render("i-hstack", { width: "100%", verticalAlignment: "center" },
                                this.$render("i-vstack", { gap: 2, width: "25%", verticalAlignment: "center" },
                                    this.$render("i-label", { caption: "Start Date", font: { size: '14px', color: colorText }, class: "opacity-50" }),
                                    this.$render("i-label", { caption: global_7.formatDate(option.startOfEntryPeriod, 'DD MMM, YYYY'), font: { size: '16px', name: 'Montserrat Regular', color: colorText } })),
                                activeTimerRows[optionIdx],
                                this.$render("i-vstack", { gap: 2, width: "25%", verticalAlignment: "center" },
                                    this.$render("i-label", { caption: "Stake Duration", font: { size: '14px', color: colorText }, class: "opacity-50" }),
                                    this.$render("i-hstack", { gap: 4, verticalAlignment: "center" }, options.map((_option, _optionIdx) => {
                                        const isCurrentIdx = optionIdx === _optionIdx;
                                        return this.$render("i-button", { caption: durationDays < 1 ? '< 1 Day' : `${durationDays} Days`, class: `btn-os ${isCurrentIdx ? 'cursor-default' : ''}`, border: { radius: 12, width: 1, style: 'solid', color: isCurrentIdx ? 'transparent' : '#8994A3' }, font: { size: '12px', name: 'Montserrat Regular', color: isCurrentIdx ? colorText : '#8994A3' }, padding: { top: 2.5, bottom: 2.5, left: 8, right: 8 }, background: { color: isCurrentIdx ? '#f15e61 !important' : 'transparent !important' }, onClick: () => onChangeStake(_optionIdx) });
                                    }))),
                                this.$render("i-vstack", { gap: 4, width: "25%", margin: { left: 'auto' }, verticalAlignment: "center", horizontalAlignment: "end" },
                                    this.$render("i-hstack", { gap: 4, class: "pointer", width: "fit-content", verticalAlignment: "center", onClick: () => this.getLPToken(campaign, lockedTokenSymbol, chainId) },
                                        this.$render("i-icon", { name: "external-link-alt", width: 12, height: 12, fill: colorText }),
                                        this.$render("i-label", { caption: `Get ${lockedTokenSymbol}`, font: { size: '13.6px', color: colorText } }),
                                        lockedTokenIconPaths.map((v) => {
                                            return this.$render("i-image", { display: "flex", width: 15, height: 15, url: assets_3.default.fullPath(v), fallbackUrl: store_9.fallBackUrl });
                                        })),
                                    campaign.showContractLink ?
                                        this.$render("i-hstack", { gap: 4, class: "pointer", width: "fit-content", verticalAlignment: "center", onClick: () => store_9.viewOnExplorerByAddress(chainId, option.address) },
                                            this.$render("i-icon", { name: "external-link-alt", width: 12, height: 12, fill: colorText, class: "inline-block" }),
                                            this.$render("i-label", { caption: "View Contract", font: { size: '13.6px', color: colorText } })) : [])),
                            this.$render("i-vstack", { gap: 8 },
                                claimStakedRow,
                                this.$render("i-vstack", { verticalAlignment: "center", horizontalAlignment: "center" }, manageStake),
                                rowRewards)));
                        return stakingElms[optionIdx];
                    }));
                    nodeItems.push(containerSection);
                    containerSection.appendChild(this.$render("i-hstack", { background: { color: colorCampaignBackground }, width: "100%", maxWidth: store_9.maxWidth, height: store_9.maxHeight }, stakingsElm));
                }
                ;
                this.stakingElm.clearInnerHTML();
                this.stakingElm.append(this.noCampaignSection, ...nodeItems);
            };
            this.$eventBus = components_12.application.EventBus;
            this.registerEvent();
        }
        validateConfig() {
        }
        async getData() {
            return this.data;
        }
        async setData(value) {
            this.data = value;
            this.pnlConfig.visible = false;
            this.stakingLayout.visible = true;
            this.onSetupPage(store_9.isWalletConnected());
        }
        async getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
        }
        async edit() {
            this.pnlConfig.showInputCampaign(!this.data, this.getCampaign());
            this.stakingLayout.visible = false;
            this.pnlConfig.visible = true;
        }
        async confirm() {
            if (this.pnlConfig) {
                this.pnlConfig.onConfirm();
            }
        }
        async discard() {
            this.pnlConfig.visible = false;
            this.stakingLayout.visible = true;
        }
        async config() {
        }
        async onConfigSave(campaign) {
            this.data = campaign;
            this.pnlConfig.visible = false;
            this.stakingLayout.visible = true;
            this.onSetupPage(store_9.isWalletConnected());
        }
        async onEditCampaign(isNew, data) {
            this.pnlConfig.showInputCampaign(isNew, this.getCampaign(data));
            this.stakingLayout.visible = false;
            this.pnlConfig.visible = true;
        }
        showImportJsonError(message) {
            this.importFileErrModal.visible = true;
            this.importFileErr.caption = message;
        }
        getCampaign(data) {
            const _data = data ? data : this.data;
            if (_data) {
                const keys = Object.keys(_data);
                let campaigns = [];
                for (const key of keys) {
                    const arr = _data[key].map((item) => {
                        item.chainId = Number(key);
                        return item;
                    });
                    campaigns.push(...arr);
                }
                return campaigns;
            }
            return _data;
        }
        render() {
            return (this.$render("i-panel", { id: "stakingComponent", class: "staking-component", minHeight: 200 },
                this.$render("i-panel", { id: "stakingLayout", class: "staking-layout", width: store_9.maxWidth, height: store_9.maxHeight },
                    this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                        this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                            this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_3.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                            this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                    this.$render("i-panel", { id: "stakingElm", class: "wrapper" })),
                this.$render("i-panel", { id: "manageStakeElm" })));
        }
    };
    StakingBlock = __decorate([
        components_12.customModule,
        components_12.customElements('i-section-staking')
    ], StakingBlock);
    exports.StakingBlock = StakingBlock;
});

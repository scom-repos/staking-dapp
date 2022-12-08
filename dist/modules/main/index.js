var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@staking/main/index.css.ts", ["require", "exports", "@ijstech/components", "@staking/assets", "@staking/store"], function (require, exports, components_1, assets_1, store_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    components_1.Styles.Theme.darkTheme.background.default = '#0c1234';
    const colorVar = {
        primaryButton: 'transparent linear-gradient(90deg, #AC1D78 0%, #E04862 100%) 0% 0% no-repeat padding-box',
        primaryGradient: 'linear-gradient(255deg,#f15e61,#b52082)',
        darkBg: '#181E3E 0% 0% no-repeat padding-box',
        primaryDisabled: 'transparent linear-gradient(270deg,#351f52,#552a42) 0% 0% no-repeat padding-box !important'
    };
    components_1.Styles.fontFace({
        fontFamily: "Apple SD Gothic Neo",
        src: `url("${assets_1.default.fullPath('fonts/FontsFree-Net-Apple-SD-Gothic-Neo-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat Regular",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-Regular.ttf')}") format("truetype")`,
        fontWeight: 'nomal',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat Bold",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat Light",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-Light.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat Medium",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-Medium.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Montserrat SemiBold",
        src: `url("${assets_1.default.fullPath('fonts/montserrat/Montserrat-SemiBold.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway Regular",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-Regular.ttf')}") format("truetype")`,
        fontWeight: 'nomal',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway Bold",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-Bold.ttf')}") format("truetype")`,
        fontWeight: 'bold',
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway Light",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-Light.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway Medium",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-Medium.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.fontFace({
        fontFamily: "Raleway SemiBold",
        src: `url("${assets_1.default.fullPath('fonts/raleway/Raleway-SemiBold.ttf')}") format("truetype")`,
        fontStyle: 'normal'
    });
    components_1.Styles.cssRule('.staking-component', {
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
                maxWidth: store_1.maxWidth,
                maxHeight: store_1.maxHeight,
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
define("@staking/main", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/assets", "@staking/global", "@staking/store", "@staking/staking-utils", "@staking/result", "@staking/manage-stake", "@staking/panel-config", "@validapp/time-is-money-sdk", "@ijstech/eth-contract", "@staking/main/index.css.ts"], function (require, exports, components_2, eth_wallet_1, assets_2, global_1, store_2, staking_utils_1, result_1, manage_stake_1, panel_config_1, time_is_money_sdk_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StakingBlock = void 0;
    components_2.Styles.Theme.applyTheme(components_2.Styles.Theme.darkTheme);
    let StakingBlock = class StakingBlock extends components_2.Module {
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
                    const chainId = store_2.getChainId();
                    const campaignObj = obj[chainId];
                    const network = store_2.getNetworkInfo(chainId);
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
                            const info = await staking_utils_1.getAllCampaignsInfo(obj, true);
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
                const isConnected = store_2.isWalletConnected();
                if (await this.isWalletValid(isConnected)) {
                    this.onSetupPage(isConnected);
                }
            };
            this.isWalletValid = async (isConnected) => {
                var _a;
                if (this.data && isConnected) {
                    try {
                        const wallet = eth_wallet_1.Wallet.getInstance();
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
                    store_2.setTokenMap();
                };
                let chainChangedEventHandler = async (hexChainId) => {
                    store_2.setTokenMap();
                };
                let selectedProvider = localStorage.getItem('walletProvider');
                if (!selectedProvider && store_2.hasMetaMask()) {
                    selectedProvider = eth_wallet_1.WalletPlugin.MetaMask;
                }
                const isValidProvider = Object.values(eth_wallet_1.WalletPlugin).includes(selectedProvider);
                if (!eth_wallet_1.Wallet.getInstance().chainId) {
                    eth_wallet_1.Wallet.getInstance().chainId = store_2.getDefaultChainId();
                }
                if (store_2.hasWallet() && isValidProvider) {
                    await store_2.connectWallet(selectedProvider, {
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
                this.campaigns = await staking_utils_1.getAllCampaignsInfo(this.data);
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
                    await this.onSetupPage(store_2.isWalletConnected(), true);
                    if (!btnClaim)
                        return;
                    btnClaim.rightIcon.visible = false;
                    btnClaim.enabled = true;
                };
                global_1.registerSendTxEvents({
                    transactionHash: callBack,
                    confirmation: confirmationCallBack
                });
                staking_utils_1.claimToken(data.reward.address, callBack);
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
                    window.open(store_2.getTokenUrl ? store_2.getTokenUrl : `#/swap?chainId=${chainId}&fromToken=BNB&toToken=${token}&fromAmount=1&showOptimizedRoutes=false`);
                }
            };
            this.init = async () => {
                super.init();
                const body = this.closest('body');
                if (body) {
                    body.style.overflow = 'auto !important';
                }
                this.pnlConfig = new panel_config_1.PanelConfig();
                this.pnlConfig.visible = false;
                this.pnlConfig.onConfigSave = (campaign) => this.onConfigSave(campaign);
                this.pnlConfig.onReset = () => {
                    this.pnlConfig.visible = false;
                    this.stakingLayout.visible = true;
                };
                this.stakingComponent.appendChild(this.pnlConfig);
                this.stakingResult = new result_1.Result();
                this.stakingComponent.appendChild(this.stakingResult);
                this.stakingResult.visible = false;
                this.showResultMessage(this.stakingResult, 'warning', '');
                setTimeout(() => {
                    this.stakingResult.closeModal();
                    this.stakingResult.visible = true;
                }, 100);
                this.initWalletData();
                store_2.setDataFromSCConfig(store_2.Networks, store_2.InfuraId);
                store_2.setCurrentChainId(store_2.getDefaultChainId());
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
                const data = store_2.getStakingStatus(key);
                if (data.value) {
                    return data.text;
                }
                return text;
            };
            this.initEmptyUI = async () => {
                if (!this.noCampaignSection) {
                    this.noCampaignSection = await components_2.Panel.create({ height: '100%' });
                }
                const isConnected = store_2.isWalletConnected();
                const isBtnShown = !this.data && isConnected;
                let importFileElm;
                let onImportCampaign;
                let onClose;
                if (isBtnShown) {
                    importFileElm = await components_2.Label.create({ visible: false });
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
                        this.$render("i-image", { url: assets_2.default.fullPath('img/staking/TrollTrooper.svg') }),
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
                this.tokenMap = store_2.getTokenMap();
                const chainId = store_2.getChainId();
                const network = store_2.getNetworkInfo(chainId);
                await this.initEmptyUI();
                this.noCampaignSection.visible = false;
                if (this.campaigns && !this.campaigns.length) {
                    this.stakingElm.clearInnerHTML();
                    this.stakingElm.appendChild(this.noCampaignSection);
                    this.noCampaignSection.visible = true;
                    this.removeTimer();
                    return;
                }
                const currentAddress = eth_wallet_1.Wallet.getInstance().address;
                let nodeItems = [];
                this.removeTimer();
                const campaigns = [this.campaigns[0]];
                for (let idx = 0; idx < campaigns.length; idx++) {
                    const campaign = this.campaigns[idx];
                    const colorCampaignLine = store_2.isThemeApplied ? campaign.customColorCampaign || '#0000001f' : '#0000001f';
                    const colorCampaignText = store_2.isThemeApplied ? campaign.customColorCampaign || '#f15e61' : '#f15e61';
                    const colorCampaignBackground = store_2.isThemeApplied ? campaign.customColorBackground || '#ffffff26' : '#ffffff26';
                    const colorStakingBackground = store_2.isThemeApplied ? campaign.customColorStakingBackground || '#ffffff07' : '#ffffff07';
                    const colorButton = store_2.isThemeApplied ? campaign.customColorButton : undefined;
                    const colorText = store_2.isThemeApplied ? campaign.customColorText || '#fff' : '#fff';
                    const colorTimeBackground = store_2.isThemeApplied ? campaign.customColorTimeBackground || '#F15E61' : '#F15E61';
                    const containerSection = await components_2.Panel.create();
                    containerSection.id = `campaign-${idx}`;
                    const options = campaign.options;
                    for (let optIdx = 0; optIdx < options.length; optIdx++) {
                        const opt = options[optIdx];
                        let lpTokenData = {};
                        let vaultTokenData = {};
                        if (opt.tokenAddress) {
                            if (opt.lockTokenType == store_2.LockTokenType.LP_Token) {
                                lpTokenData = {
                                    'object': await staking_utils_1.getLPObject(opt.tokenAddress)
                                };
                            }
                            else if (opt.lockTokenType == store_2.LockTokenType.VAULT_Token) {
                                vaultTokenData = {
                                    'object': await staking_utils_1.getVaultObject(opt.tokenAddress)
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
                    const lockedTokenObject = store_2.getLockedTokenObject(stakingInfo, stakingInfo.tokenInfo, this.tokenMap);
                    const lockedTokenSymbol = store_2.getLockedTokenSymbol(stakingInfo, lockedTokenObject);
                    const lockedTokenIconPaths = store_2.getLockedTokenIconPaths(stakingInfo, lockedTokenObject, chainId, this.tokenMap);
                    const lockedTokenDecimals = (lockedTokenObject === null || lockedTokenObject === void 0 ? void 0 : lockedTokenObject.decimals) || 18;
                    const defaultDecimalsOffset = 18 - lockedTokenDecimals;
                    const activeStartTime = stakingInfo ? stakingInfo.startOfEntryPeriod : 0;
                    const activeEndTime = stakingInfo ? stakingInfo.endOfEntryPeriod : 0;
                    let isStarted = components_2.moment(activeStartTime).diff(components_2.moment()) <= 0;
                    let isClosed = components_2.moment(activeEndTime).diff(components_2.moment()) <= 0;
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
                        stakingElms[i] = await components_2.VStack.create({ visible: i === 0 });
                        activeTimerRows[i] = await components_2.VStack.create({ gap: 2, width: '25%', verticalAlignment: 'center' });
                        activeTimerElms[i] = await components_2.VStack.create();
                        activeTimerRows[i].appendChild(this.$render("i-label", { caption: "End Date", font: { size: '14px', color: colorText }, class: "opacity-50" }));
                        activeTimerRows[i].appendChild(activeTimerElms[i]);
                        endHours[i] = await components_2.Label.create(optionTimer);
                        endDays[i] = await components_2.Label.create(optionTimer);
                        endMins[i] = await components_2.Label.create(optionTimer);
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
                        stickerSections[i] = await components_2.Panel.create({ visible: false });
                        stickerLabels[i] = await components_2.Label.create();
                        stickerIcons[i] = await components_2.Icon.create();
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
                        if (!store_2.isWalletConnected())
                            return;
                        let i = 0;
                        for (const o of options) {
                            const _totalLocked = await staking_utils_1.getStakingTotalLocked(o.address);
                            totalLocked[o.address] = _totalLocked;
                            const optionQty = new eth_wallet_1.BigNumber(o.maxTotalLock).minus(_totalLocked).shiftedBy(defaultDecimalsOffset);
                            if (o.mode === 'Stake') {
                                const keyStake = `#btn-stake-${o.address}`;
                                const btnStake = this.querySelector(keyStake);
                                const isStaking = store_2.getStakingStatus(keyStake).value;
                                if (btnStake) {
                                    let isValidInput = false;
                                    const inputElm = this.querySelector(`#input-${o.address}`);
                                    if (inputElm) {
                                        const manageStake = this.querySelector(`#manage-stake-${o.address}`);
                                        const inputVal = new eth_wallet_1.BigNumber(inputElm.value || 0);
                                        isValidInput = inputVal.gt(0) && inputVal.lte(manageStake.getBalance()) && !(manageStake === null || manageStake === void 0 ? void 0 : manageStake.needToBeApproval());
                                    }
                                    btnStake.enabled = !isStaking && isValidInput && (isStarted && !(optionQty.lte(0) || isClosed));
                                }
                            }
                            else {
                                const keyUnstake = `#btn-unstake-${o.address}`;
                                const btnUnstake = this.querySelector(keyUnstake);
                                const isUnstaking = store_2.getStakingStatus(keyUnstake).value;
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
                        isStarted = components_2.moment(activeStartTime).diff(components_2.moment()) <= 0;
                        isClosed = components_2.moment(activeEndTime).diff(components_2.moment()) <= 0;
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
                            const days = components_2.moment(activeEndTime).diff(components_2.moment(), 'days');
                            const hours = components_2.moment(activeEndTime).diff(components_2.moment(), 'hours') - days * 24;
                            const mins = components_2.moment(activeEndTime).diff(components_2.moment(), 'minutes') - days * 24 * 60 - hours * 60;
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
                        const manageStake = new manage_stake_1.ManageStake();
                        manageStake.id = `manage-stake-${option.address}`;
                        manageStake.width = '100%';
                        manageStake.onRefresh = () => this.onSetupPage(store_2.isWalletConnected(), true);
                        this.manageStakeElm.clearInnerHTML();
                        this.manageStakeElm.appendChild(manageStake);
                        manageStake.setData(Object.assign(Object.assign({}, campaign), option));
                        const isClaim = option.mode === 'Claim';
                        const rewardsData = [option.rewardsData[0]];
                        const rewardOptions = !isClaim ? rewardsData : [];
                        let aprInfo = {};
                        const claimStakedRow = await components_2.HStack.create({ verticalAlignment: 'center', horizontalAlignment: 'space-between' });
                        claimStakedRow.appendChild(this.$render("i-label", { caption: "You Staked", font: { size: '16px', color: colorText } }));
                        claimStakedRow.appendChild(this.$render("i-label", { caption: `${global_1.formatNumber(new eth_wallet_1.BigNumber(option.stakeQty).shiftedBy(defaultDecimalsOffset))} ${lockedTokenSymbol}`, font: { size: '16px', name: 'Montserrat Regular', color: colorText } }));
                        const rowRewards = await components_2.VStack.create({ gap: 8, verticalAlignment: 'center' });
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
                                this.$render("i-label", { caption: `${global_1.formatNumber(new eth_wallet_1.BigNumber(reward.vestedReward || 0).shiftedBy(rewardLockedDecimalsOffset))} ${rewardSymbol}`, font: { size: '16px', name: 'Montserrat Regular', color: colorText } })));
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
                            const passClaimStartTime = !(reward.claimStartTime && components_2.moment().diff(components_2.moment.unix(reward.claimStartTime)) < 0);
                            let rewardClaimable = `0 ${rewardSymbol}`;
                            if (passClaimStartTime && isClaim) {
                                rewardClaimable = `${global_1.formatNumber(new eth_wallet_1.BigNumber(reward.claimable).shiftedBy(decimalsOffset))} ${rewardSymbol}`;
                            }
                            let startClaimingText = '';
                            if (!(!reward.claimStartTime || passClaimStartTime) && isClaim) {
                                const claimStart = components_2.moment.unix(reward.claimStartTime).format('YYYY-MM-DD HH:mm:ss');
                                startClaimingText = `(Claim ${rewardSymbol} after ${claimStart})`;
                            }
                            rowRewards.appendChild(this.$render("i-hstack", { horizontalAlignment: "space-between" },
                                this.$render("i-label", { caption: `${rewardSymbol} Claimable`, font: { size: '16px', color: colorText } }),
                                this.$render("i-label", { caption: rewardClaimable, font: { size: '16px', name: 'Montserrat Regular', color: colorText } }),
                                startClaimingText ? this.$render("i-label", { caption: startClaimingText, font: { size: '16px', color: colorText } }) : []));
                            const btnClaim = await components_2.Button.create({
                                rightIcon: { spin: true, fill: colorText, visible: false },
                                caption: `Claim ${rewardSymbol}`,
                                background: { color: `${colorButton} !important` },
                                font: { color: colorText },
                                enabled: !(!passClaimStartTime || new eth_wallet_1.BigNumber(reward.claimable).isZero()) && isClaim,
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
                                const apr = new eth_wallet_1.BigNumber(aprInfo[rewardOption.rewardTokenAddress]).times(100).toFormat(2, eth_wallet_1.BigNumber.ROUND_DOWN);
                                return `${apr}%`;
                            }
                            return '';
                        };
                        const durationDays = option.minLockTime / (60 * 60 * 24);
                        const _lockedTokenObject = store_2.getLockedTokenObject(option, option.tokenInfo, this.tokenMap);
                        const _lockedTokenIconPaths = store_2.getLockedTokenIconPaths(option, _lockedTokenObject, chainId, this.tokenMap);
                        const pathsLength = _lockedTokenIconPaths.length;
                        const rewardToken = this.getRewardToken(rewardsData[0].rewardTokenAddress);
                        const rewardIconPath = store_2.getTokenIconPath(rewardToken, chainId);
                        stakingElms[optionIdx].appendChild(this.$render("i-vstack", { gap: 16, width: store_2.maxWidth, height: "100%", padding: { top: 10, bottom: 10, left: 20, right: 20 }, position: "relative" },
                            stickerSections[optionIdx],
                            this.$render("i-hstack", { gap: 10, width: "100%", verticalAlignment: "center" },
                                this.$render("i-hstack", { gap: 10, width: "50%" },
                                    this.$render("i-hstack", { width: pathsLength === 1 ? 63.5 : 80, position: "relative", verticalAlignment: "center" },
                                        this.$render("i-image", { width: 60, height: 60, url: assets_2.default.fullPath(rewardIconPath), fallbackUrl: store_2.fallBackUrl }),
                                        _lockedTokenIconPaths.map((v, idxImg) => {
                                            return this.$render("i-image", { position: "absolute", width: 28, height: 28, bottom: 0, left: (idxImg * 20) + 35, url: assets_2.default.fullPath(v), fallbackUrl: store_2.fallBackUrl });
                                        })),
                                    this.$render("i-vstack", { gap: 2, overflow: { x: 'hidden' }, verticalAlignment: "center" },
                                        this.$render("i-label", { visible: !!campaign.customName, caption: campaign.customName, font: { size: '20px', name: 'Montserrat Bold', color: colorCampaignText, bold: true }, class: "text-overflow" }),
                                        this.$render("i-label", { visible: !!campaign.customDesc, caption: campaign.customDesc, font: { size: '16px', name: 'Montserrat Regular', color: colorText }, class: "opacity-50 text-overflow" }))),
                                await Promise.all(rewardOptions.map(async (rewardOption, idx) => {
                                    const lbApr = await components_2.Label.create({ font: { size: '40px', name: 'Montserrat Medium', color: '#72F35D' } });
                                    const lbRate = await components_2.Label.create({ font: { size: '16px', name: 'Montserrat Regular', color: colorText } });
                                    lbApr.classList.add('text-overflow');
                                    lbRate.classList.add('opacity-50');
                                    const rewardToken = this.getRewardToken(rewardOption.rewardTokenAddress);
                                    const rewardTokenDecimals = rewardToken.decimals || 18;
                                    const decimalsOffset = 18 - rewardTokenDecimals;
                                    const lockTokenType = option.lockTokenType;
                                    const rateDesc = `1 ${lockTokenType === store_2.LockTokenType.LP_Token ? 'LP' : store_2.tokenSymbol(option.lockTokenAddress)} : ${new eth_wallet_1.BigNumber(rewardOption.multiplier).shiftedBy(decimalsOffset).toFixed()} ${store_2.tokenSymbol(rewardOption.rewardTokenAddress)}`;
                                    const updateApr = async () => {
                                        var _a, _b, _c, _d;
                                        if (lockTokenType === store_2.LockTokenType.ERC20_Token) {
                                            const apr = await staking_utils_1.getERC20RewardCurrentAPR(rewardOption, lockedTokenObject, durationDays);
                                            if (!isNaN(parseFloat(apr))) {
                                                aprInfo[rewardOption.rewardTokenAddress] = apr;
                                            }
                                        }
                                        else if (lockTokenType === store_2.LockTokenType.LP_Token) {
                                            if (rewardOption.referencePair) {
                                                aprInfo[rewardOption.rewardTokenAddress] = await staking_utils_1.getLPRewardCurrentAPR(rewardOption, (_b = (_a = option.tokenInfo) === null || _a === void 0 ? void 0 : _a.lpToken) === null || _b === void 0 ? void 0 : _b.object, durationDays);
                                            }
                                        }
                                        else {
                                            aprInfo[rewardOption.rewardTokenAddress] = await staking_utils_1.getVaultRewardCurrentAPR(rewardOption, (_d = (_c = option.tokenInfo) === null || _c === void 0 ? void 0 : _c.vaultToken) === null || _d === void 0 ? void 0 : _d.object, durationDays);
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
                                    this.$render("i-label", { caption: global_1.formatDate(option.startOfEntryPeriod, 'DD MMM, YYYY'), font: { size: '16px', name: 'Montserrat Regular', color: colorText } })),
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
                                            return this.$render("i-image", { display: "flex", width: 15, height: 15, url: assets_2.default.fullPath(v), fallbackUrl: store_2.fallBackUrl });
                                        })),
                                    campaign.showContractLink ?
                                        this.$render("i-hstack", { gap: 4, class: "pointer", width: "fit-content", verticalAlignment: "center", onClick: () => store_2.viewOnExplorerByAddress(chainId, option.address) },
                                            this.$render("i-icon", { name: "external-link-alt", width: 12, height: 12, fill: colorText, class: "inline-block" }),
                                            this.$render("i-label", { caption: "View Contract", font: { size: '13.6px', color: colorText } })) : [])),
                            this.$render("i-vstack", { gap: 8 },
                                claimStakedRow,
                                this.$render("i-vstack", { verticalAlignment: "center", horizontalAlignment: "center" }, manageStake),
                                rowRewards)));
                        return stakingElms[optionIdx];
                    }));
                    nodeItems.push(containerSection);
                    containerSection.appendChild(this.$render("i-hstack", { background: { color: colorCampaignBackground }, width: "100%", maxWidth: store_2.maxWidth, height: store_2.maxHeight }, stakingsElm));
                }
                ;
                this.stakingElm.clearInnerHTML();
                this.stakingElm.append(this.noCampaignSection, ...nodeItems);
            };
            this.$eventBus = components_2.application.EventBus;
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
            this.onSetupPage(store_2.isWalletConnected());
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
            this.onSetupPage(store_2.isWalletConnected());
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
                this.$render("i-panel", { id: "stakingLayout", class: "staking-layout", width: store_2.maxWidth, height: store_2.maxHeight },
                    this.$render("i-vstack", { id: "loadingElm", class: "i-loading-overlay" },
                        this.$render("i-vstack", { class: "i-loading-spinner", horizontalAlignment: "center", verticalAlignment: "center" },
                            this.$render("i-icon", { class: "i-loading-spinner_icon", image: { url: assets_2.default.fullPath('img/loading.svg'), width: 36, height: 36 } }),
                            this.$render("i-label", { caption: "Loading...", font: { color: '#FD4A4C', size: '1.5em' }, class: "i-loading-spinner_text" }))),
                    this.$render("i-panel", { id: "stakingElm", class: "wrapper" })),
                this.$render("i-panel", { id: "manageStakeElm" })));
        }
    };
    StakingBlock = __decorate([
        components_2.customModule
    ], StakingBlock);
    exports.StakingBlock = StakingBlock;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@staking/panel-config/panel-config.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    components_1.Styles.cssRule('.panel-config', {
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
define("@staking/panel-config/reward.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/token-selection"], function (require, exports, components_2, eth_wallet_1, global_1, store_1, token_selection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RewardConfig = void 0;
    ;
    let RewardConfig = class RewardConfig extends components_2.Module {
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
                            const tokenMap = store_1.getTokenMapData(this.chainId);
                            const token = tokenMap[rewardTokenAddress] || tokenMap[rewardTokenAddress === null || rewardTokenAddress === void 0 ? void 0 : rewardTokenAddress.toLowerCase()];
                            this.inputAddress.value = address;
                            this.isAddressValid = true;
                            this.token = token;
                            this.tokenSelection.token = token;
                            this.inputMultiplier.value = new eth_wallet_1.BigNumber(multiplier).toFixed();
                            this.inputInitialReward.value = new eth_wallet_1.BigNumber(initialReward).toFixed();
                            this.inputRewardVesting.value = new eth_wallet_1.BigNumber(vestingPeriod).dividedBy(this.hourVal).toFixed();
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
                    this.lbMaxReward.caption = `${global_1.formatNumber(this.maxReward)} ${this.token.symbol || ''}`;
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
                const vstack = await components_2.VStack.create({ gap: 8 });
                const dropdownModal = await components_2.Modal.create({
                    showBackdrop: false,
                    maxWidth: 80,
                    minWidth: 'auto',
                    popupPlacement: 'bottom'
                });
                this.btnTime = await components_2.Button.create({
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
                    const dropdownItem = await components_2.Button.create({
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
                    const minDate = components_2.moment.unix(this.campaignEndLockTime);
                    const val = minDate.add(60, 'seconds');
                    if (this.campaignEndLockTime) {
                        startDateElm.min = val.format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (this.vestingStartDate && this.vestingStartDate <= this.campaignEndLockTime) {
                        this.lbStartDateErr.visible = true;
                        this.lbStartDateErr.caption = `The start date should be greater than <b>${val.format(global_1.DefaultDateTimeFormat)}</b>`;
                    }
                    else {
                        this.lbStartDateErr.visible = false;
                    }
                }
            };
            this.setStartDate = (value) => {
                const startDate = new eth_wallet_1.BigNumber(value || 0).toNumber();
                this.vestingStartDate = startDate;
                const startTextElm = this.inputVestingStartDate.querySelector('input[type="text"]');
                if (startDate) {
                    startTextElm.value = components_2.moment.unix(startDate).format(global_1.DefaultDateTimeFormat);
                }
                this.emitInput();
            };
            this.setAdminClaimDeadline = (value) => {
                const date = new eth_wallet_1.BigNumber(value || components_2.moment('31/12/9999 23:59:59', global_1.DefaultDateTimeFormat).unix()).toNumber();
                this.adminClaimDeadline = date;
                const elm = this.inputAdminClaimDeadline.querySelector('input[type="text"]');
                if (date) {
                    elm.value = components_2.moment.unix(date).format(global_1.DefaultDateTimeFormat);
                }
                this.emitInput();
            };
            this.setAttrDatePicker = () => {
                this.inputVestingStartDate.dateTimeFormat = global_1.DefaultDateTimeFormat;
                this.inputAdminClaimDeadline.dateTimeFormat = global_1.DefaultDateTimeFormat;
                this.inputVestingStartDate.onChanged = (datepickerElm) => this.changeStartDate(datepickerElm.inputElm.value);
                this.inputAdminClaimDeadline.onChanged = (datepickerElm) => this.changeAdminClaimDeadline(datepickerElm.inputElm.value);
                const startTextElm = this.inputVestingStartDate.querySelector('input[type="text"]');
                if (startTextElm) {
                    startTextElm.placeholder = global_1.DefaultDateTimeFormat;
                }
                const adminTextElm = this.inputAdminClaimDeadline.querySelector('input[type="text"]');
                if (adminTextElm) {
                    adminTextElm.placeholder = global_1.DefaultDateTimeFormat;
                }
                const adminDateElm = this.inputAdminClaimDeadline.querySelector('input[type="datetime-local"]');
                if (adminDateElm) {
                    adminDateElm.min = components_2.moment().add(300, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                }
                this.setAdminClaimDeadline(components_2.moment('31/12/9999 23:59:59', global_1.DefaultDateTimeFormat).unix());
                this.checkStartDate();
            };
            this.changeStartDate = (value) => {
                const date = components_2.moment(value, global_1.DefaultDateTimeFormat);
                this.vestingStartDate = date.unix();
                if (this.vestingStartDate <= this.campaignEndLockTime) {
                    const minDate = components_2.moment.unix(this.campaignEndLockTime).add(60, 'seconds');
                    this.lbStartDateErr.visible = true;
                    this.lbStartDateErr.caption = `The start date should be greater than <b>${minDate.format(global_1.DefaultDateTimeFormat)}</b>`;
                }
                else {
                    this.lbStartDateErr.visible = false;
                }
                this.emitInput();
            };
            this.changeAdminClaimDeadline = (value) => {
                const date = components_2.moment(value, global_1.DefaultDateTimeFormat);
                this.adminClaimDeadline = date.unix();
                const minDate = components_2.moment().add(300, 'seconds');
                if (this.adminClaimDeadline <= minDate.unix() && this.isNew) {
                    this.lbErrAdminClaimDeadline.visible = true;
                    this.lbErrAdminClaimDeadline.caption = `The admin claim deadline should be greater than <b>${minDate.format(global_1.DefaultDateTimeFormat)}</b>`;
                }
                else {
                    this.lbErrAdminClaimDeadline.visible = false;
                }
                this.emitInput();
            };
            this.emitInput = () => {
                components_2.application.EventBus.dispatch("emitInput" /* EmitInput */);
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
                global_1.limitInputNumber(input, 18);
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
                if (global_1.isInvalidInput(_value)) {
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
                this.isAddressValid = await global_1.isAddressValid(this.inputAddress.value);
                this.lbAddressErr.visible = !this.isAddressValid;
                this.emitInput();
            };
            this.checkValidation = () => {
                return this.token &&
                    this.checkInitialReward() &&
                    global_1.isValidNumber(this.inputMultiplier.value) &&
                    global_1.isValidNumber(this.inputRewardVesting.value) &&
                    (!this.isNew || (this.adminClaimDeadline && this.adminClaimDeadline > components_2.moment().unix())) &&
                    (!this.checkboxStartDate.checked || (this.checkboxStartDate.checked && (!this.campaignEndLockTime || this.vestingStartDate > this.campaignEndLockTime))) &&
                    (this.isNew || this.isAddressValid);
            };
            this.getData = () => {
                var _a;
                const reward = {
                    address: this.inputAddress.value,
                    rewardTokenAddress: ((_a = this.token) === null || _a === void 0 ? void 0 : _a.address) || '',
                    multiplier: new eth_wallet_1.BigNumber(this.inputMultiplier.value),
                    initialReward: new eth_wallet_1.BigNumber(this.inputInitialReward.value),
                    vestingPeriod: new eth_wallet_1.BigNumber(this.inputRewardVesting.value).multipliedBy(this.unit).multipliedBy(this.hourVal),
                    claimDeadline: new eth_wallet_1.BigNumber(this.adminClaimDeadline),
                    admin: '',
                    isCommonStartDate: this.checkboxStartDate.checked,
                    vestingStartDate: new eth_wallet_1.BigNumber(this.vestingStartDate || 0),
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
            return this._chainId || store_1.getChainId() || store_1.getDefaultChainId();
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
            return new eth_wallet_1.BigNumber(this.inputMultiplier.value || 0).multipliedBy(this.maxTotal);
        }
        get rate() {
            return new eth_wallet_1.BigNumber(this.inputMultiplier.value || 0).multipliedBy(this.maxTotal);
        }
        async init() {
            super.init();
            this.tokenSelection = new token_selection_1.TokenSelection();
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
        components_2.customElements('staking-reward-config')
    ], RewardConfig);
    exports.RewardConfig = RewardConfig;
});
define("@staking/panel-config/staking.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/token-selection", "@staking/panel-config/reward.tsx"], function (require, exports, components_3, eth_wallet_2, global_2, store_2, token_selection_2, reward_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StakingConfig = void 0;
    ;
    let StakingConfig = class StakingConfig extends components_3.Module {
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
                    this.btnAdd.visible = store_2.isMultiple && this.isNew;
                    this.btnAdd.enabled = store_2.isMultiple && this.isNew;
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
                            const tokenMap = store_2.getTokenMapData(this.chainId);
                            const token = tokenMap[lockTokenAddress] || tokenMap[lockTokenAddress === null || lockTokenAddress === void 0 ? void 0 : lockTokenAddress.toLowerCase()];
                            const lockingTime = new eth_wallet_2.BigNumber(minLockTime);
                            this.inputAddress.value = address;
                            this.isAddressValid = true;
                            this.token = token;
                            this.tokenSelection.token = token;
                            this.inputLockingTime.value = lockingTime.dividedBy(this.hourVal).toFixed();
                            // this.lbMinLockTime.caption = lockingTime.isEqualTo(1) ? '1 second' : `${formatNumber(minLockTime)} seconds`;
                            this.inputPerAddressCap.value = new eth_wallet_2.BigNumber(perAddressCap).toFixed();
                            this.inputMaxTotalLock.value = new eth_wallet_2.BigNumber(maxTotalLock).toFixed();
                            this.inputDesc.value = customDesc || '';
                            this.btnType.caption = ((_a = store_2.LockTokenTypeList.find(f => f.value === this.lockType)) === null || _a === void 0 ? void 0 : _a.name) || 'Select Type';
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
                const vstack = await components_3.VStack.create({ gap: 8 });
                const dropdownModal = await components_3.Modal.create({
                    showBackdrop: false,
                    maxWidth: 80,
                    minWidth: 'auto',
                    popupPlacement: 'bottom'
                });
                this.btnTime = await components_3.Button.create({
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
                    const dropdownItem = await components_3.Button.create({
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
                const vstack = await components_3.VStack.create({ gap: 8 });
                const dropdownModal = await components_3.Modal.create({
                    showBackdrop: false,
                    width: '100%',
                    maxWidth: 300,
                    popupPlacement: 'bottom'
                });
                if (this.lockType === undefined) {
                    this.lockType = (_a = store_2.LockTokenTypeList[0]) === null || _a === void 0 ? void 0 : _a.value;
                }
                const type = store_2.LockTokenTypeList.find(f => f.value === this.lockType);
                this.btnType = await components_3.Button.create({
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
                for (const type of store_2.LockTokenTypeList) {
                    const dropdownItem = await components_3.Button.create({
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
                const pnl = await components_3.Panel.create({ position: 'relative' });
                pnl.classList.add('pnl-label');
                const icon = await components_3.Icon.create({ name: 'times', fill: '#181e3e', height: 12, width: 12, position: 'absolute', top: 1, right: 1 });
                icon.onClick = () => this.removeReward(idx);
                const button = await components_3.Button.create({ caption: `Reward ${store_2.isMultiple ? idx + 1 : ''}`, padding: { top: 6, bottom: 6, left: 16, right: 16 } });
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
                if (store_2.isMultiple)
                    pnl.appendChild(icon);
                this.listRewardButton.appendChild(pnl);
                await this.addReward(idx, reward);
                this.btnAdd.enabled = true;
            };
            this.onAddRewardByClick = () => {
                if (!store_2.isMultiple)
                    return;
                this.onAddReward();
            };
            this.emitInput = () => {
                components_3.application.EventBus.dispatch("emitInput" /* EmitInput */);
            };
            this.onInputAddress = async () => {
                this.isAddressValid = await global_2.isAddressValid(this.inputAddress.value);
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
                global_2.limitInputNumber(input, 18);
                this.updateMaxReward();
                this.emitInput();
            };
            this.onInputNumber = (input) => {
                global_2.limitInputNumber(input, 18);
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
                    global_2.isValidNumber(this.inputLockingTime.value) &&
                    global_2.isValidNumber(this.inputPerAddressCap.value) &&
                    global_2.isValidNumber(this.inputMaxTotalLock.value) &&
                    (this.isNew || this.isAddressValid) &&
                    this.isRewardValid();
            };
            this.getRewardData = () => {
                const rewardData = [];
                const totalRewards = [];
                for (const reward of this.rewardConfig) {
                    const data = reward.getData();
                    rewardData.push(data);
                    totalRewards.push({ value: data.rewardAmount || new eth_wallet_2.BigNumber(0), tokenAddress: data.rewardTokenAddress });
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
                    perAddressCap: new eth_wallet_2.BigNumber(this.inputPerAddressCap.value),
                    maxTotalLock: new eth_wallet_2.BigNumber(this.inputMaxTotalLock.value),
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
            return this._chainId || store_2.getChainId() || store_2.getDefaultChainId();
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
                return new eth_wallet_2.BigNumber(this.inputLockingTime.value || 0).multipliedBy(this.unit).multipliedBy(this.hourVal);
            }
            return new eth_wallet_2.BigNumber(0);
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
            this.tokenSelection = new token_selection_2.TokenSelection();
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
                        this.$render("i-button", { id: "btnAdd", visible: store_2.isMultiple, class: "btn-os", margin: { left: 'auto' }, caption: "Add Reward", onClick: () => this.onAddRewardByClick() })),
                    this.$render("i-panel", { width: "100%", height: 2, margin: { bottom: 10 }, background: { color: '#6573c3' } }),
                    this.$render("i-panel", { id: "pnlInfoElm" }))));
        }
    };
    StakingConfig = __decorate([
        components_3.customElements('staking-config')
    ], StakingConfig);
    exports.StakingConfig = StakingConfig;
});
define("@staking/panel-config/campaign.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/panel-config/staking.tsx"], function (require, exports, components_4, eth_wallet_3, global_3, store_3, staking_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CampaignConfig = void 0;
    ;
    let CampaignConfig = class CampaignConfig extends components_4.Module {
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
                    this.btnAdd.visible = store_3.isMultiple && this.isNew;
                    this.btnAdd.enabled = store_3.isMultiple && this.isNew;
                }
            };
            this.setupData = async () => {
                if (this.data) {
                    const { chainId, customName, customDesc, customLogo, getTokenURL, campaignStart, campaignEnd, showContractLink, admin, customColorCampaign, customColorBackground, customColorStakingBackground, customColorButton, customColorText, customColorTimeBackground, stakings } = this.data;
                    const interval = setInterval(async () => {
                        if (this.isInitialized) {
                            clearInterval(interval);
                            this.network = chainId || store_3.getChainId();
                            this.inputName.value = customName;
                            this.inputDesc.value = customDesc || '';
                            this.inputURL.value = getTokenURL || '';
                            if (customLogo) {
                                this.uploadLogo.preview(customLogo);
                            }
                            const start = new eth_wallet_3.BigNumber(campaignStart).toNumber();
                            const end = new eth_wallet_3.BigNumber(campaignEnd).toNumber();
                            this.campaignStart = start;
                            this.campaignEnd = end;
                            const startElm = this.inputCampaignStart.querySelector('input[type="text"]');
                            const endElm = this.inputCampaignEnd.querySelector('input[type="text"]');
                            startElm.value = components_4.moment.unix(start).format(global_3.DefaultDateTimeFormat);
                            endElm.value = components_4.moment.unix(end).format(global_3.DefaultDateTimeFormat);
                            this.checkboxContract.checked = !!showContractLink;
                            this.inputAdmin.value = admin;
                            if (admin) {
                                this.isAdminValid = await global_3.isAddressValid(admin);
                                this.lbErrAdmin.visible = !this.isAdminValid;
                            }
                            this.inputMainColor.value = customColorCampaign || '';
                            this.inputBg.value = customColorBackground || '';
                            this.inputColorText.value = customColorText || '';
                            this.inputCountdownBg.value = customColorTimeBackground || '';
                            this.inputStakingBg.value = customColorStakingBackground || '';
                            this.inputStakingBtn.value = customColorButton || '';
                            const networkObj = store_3.Networks.find(f => f.chainId === this.network);
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
                this.inputCampaignStart.dateTimeFormat = global_3.DefaultDateTimeFormat;
                this.inputCampaignEnd.dateTimeFormat = global_3.DefaultDateTimeFormat;
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
                    startTextElm.placeholder = global_3.DefaultDateTimeFormat;
                }
                // if (endDateElm) {
                //   endDateElm.min = minDate.add(360, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                // }
                if (endTextElm) {
                    endTextElm.placeholder = global_3.DefaultDateTimeFormat;
                }
            };
            this.checkCampaignDate = () => {
                const date = components_4.moment();
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
                const date = components_4.moment(value, global_3.DefaultDateTimeFormat);
                this.campaignStart = date.unix();
                if (inputEndDate) {
                    inputEndDate.min = date.add(60, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                    this.checkCampaignDate();
                }
                this.emitInput();
            };
            this.changeEndDate = (value) => {
                const inputStartDate = this.inputCampaignStart.querySelector('input[type="datetime-local"]');
                const date = components_4.moment(value, global_3.DefaultDateTimeFormat);
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
                const vstack = await components_4.VStack.create({ gap: 8 });
                const dropdownModal = await components_4.Modal.create({
                    showBackdrop: false,
                    width: '100%',
                    maxWidth: 300,
                    popupPlacement: 'bottom',
                });
                const listNetwork = store_3.Networks.filter(f => !f.isDisabled);
                const networkObj = listNetwork.find(f => f.chainId === this.network);
                this.btnNetwork = await components_4.Button.create({
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
                    const dropdownItem = await components_4.Button.create({
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
                const pnl = await components_4.Panel.create({ position: 'relative' });
                pnl.classList.add('pnl-label');
                const icon = await components_4.Icon.create({ name: 'times', fill: '#181e3e', height: 12, width: 12, position: 'absolute', top: 1, right: 1 });
                icon.onClick = () => this.removeStaking(idx);
                const button = await components_4.Button.create({ caption: `Staking ${store_3.isMultiple ? idx + 1 : ''}`, padding: { top: 6, bottom: 6, left: 16, right: 16 } });
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
                if (store_3.isMultiple)
                    pnl.appendChild(icon);
                this.listStakingButton.appendChild(pnl);
                await this.addStaking(idx, staking);
                this.btnAdd.enabled = true;
            };
            this.onAddStakingByClick = () => {
                if (!store_3.isMultiple)
                    return;
                this.onAddStaking();
            };
            this.emitInput = () => {
                components_4.application.EventBus.dispatch("emitInput" /* EmitInput */);
            };
            this.onInputText = () => {
            };
            this.onInputAdmin = async () => {
                this.isAdminValid = await global_3.isAddressValid(this.inputAdmin.value);
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
                                listRewardNeeded[tokenAddress] = new eth_wallet_3.BigNumber(listRewardNeeded[tokenAddress]).plus(value);
                            }
                            else {
                                listRewardNeeded[tokenAddress] = value;
                            }
                        }
                    }
                }
                const tokenMap = store_3.getTokenMap();
                let isValid = true;
                let invalidTokens = [];
                for (const key of Object.keys(listRewardNeeded)) {
                    const token = tokenMap[key.toLowerCase()];
                    const amount = listRewardNeeded[key];
                    const balance = store_3.getTokenBalance(token);
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
                    campaignStart: new eth_wallet_3.BigNumber(this.campaignStart),
                    campaignEnd: new eth_wallet_3.BigNumber(this.campaignEnd),
                    showContractLink: this.checkboxContract.checked || undefined,
                    admin: `${this.inputAdmin.value}`,
                    customColorCampaign: store_3.isThemeApplied ? undefined : this.inputMainColor.value || undefined,
                    customColorBackground: store_3.isThemeApplied ? undefined : this.inputBg.value || undefined,
                    customColorStakingBackground: store_3.isThemeApplied ? undefined : this.inputStakingBg.value || undefined,
                    customColorButton: store_3.isThemeApplied ? undefined : this.inputStakingBtn.value || undefined,
                    customColorText: store_3.isThemeApplied ? undefined : this.inputColorText.value || undefined,
                    customColorTimeBackground: store_3.isThemeApplied ? undefined : this.inputCountdownBg.value || undefined,
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
            this.network = store_3.getChainId() || store_3.getDefaultChainId();
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
                    this.$render("i-vstack", { visible: store_3.isThemeApplied, gap: 10, width: "100%", verticalAlignment: "center" },
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
                        this.$render("i-button", { visible: store_3.isMultiple, id: "btnAdd", class: "btn-os", margin: { left: 'auto' }, caption: "Add Staking", onClick: () => this.onAddStakingByClick() })),
                    this.$render("i-panel", { width: "100%", height: 2, margin: { bottom: 10 }, background: { color: '#6573C3' } }),
                    this.$render("i-panel", { id: "pnlInfoElm" }),
                    this.$render("i-label", { id: "lbErrBalance", visible: false, font: { size: '14px', color: '#f50057', bold: true }, display: "flex", margin: { top: 10 } }))));
        }
    };
    CampaignConfig = __decorate([
        components_4.customElements('staking-campaign-config')
    ], CampaignConfig);
    exports.CampaignConfig = CampaignConfig;
});
define("@staking/panel-config/panel-config.tsx", ["require", "exports", "@ijstech/components", "@ijstech/eth-wallet", "@staking/global", "@staking/store", "@staking/panel-config/campaign.tsx", "@staking/staking-utils", "@staking/result", "@staking/panel-config/panel-config.css.ts"], function (require, exports, components_5, eth_wallet_4, global_4, store_4, campaign_1, staking_utils_1, result_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PanelConfig = void 0;
    ;
    let PanelConfig = class PanelConfig extends components_5.Module {
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
                const isConnected = store_4.isWalletConnected();
                this.networkElm.visible = !isConnected;
                this.campaignElm.visible = isConnected;
                this.updateNetworkName(store_4.getChainId());
            };
            this.onChangeChanged = () => {
                const chainId = store_4.getChainId();
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
                this.wapperCampaignsButton.visible = store_4.isMultiple && !isNew;
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
                const network = store_4.getNetworkInfo(chainId);
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
                    const pnl = await components_5.Panel.create({ position: 'relative' });
                    pnl.classList.add('pnl-label');
                    const icon = await components_5.Icon.create({ name: 'times', fill: '#181e3e', height: 12, width: 12, position: 'absolute', top: 1, right: 1 });
                    icon.onClick = () => this.removeCampaign(idx);
                    const button = await components_5.Button.create({ caption: `Campaign ${idx + 1}`, padding: { top: 6, bottom: 6, left: 16, right: 16 } });
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
                if (this.isNew || !store_4.isMultiple)
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
                    const currentAddress = eth_wallet_4.Wallet.getInstance().address || '';
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
                    global_4.downloadJsonFile('campaign.json', Object.assign({}, data));
                    return;
                }
                if (this.checkValidation()) {
                    this.parseData();
                    const campaigns = Object.assign({}, this.campaigns);
                    global_4.downloadJsonFile('campaign.json', campaigns);
                }
            };
            this.onDeployCampaign = async () => {
                if (this.isNew && this.checkValidation()) {
                    const campaign = this.campaignConfig[0].getData();
                    const chainId = store_4.getChainId();
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
                    global_4.registerSendTxEvents({
                        transactionHash: callBack,
                        confirmation: confirmationCallBack
                    });
                    result = await staking_utils_1.deployCampaign(campaign, callBack);
                    if (result) {
                        this.stakingResult.closeModal();
                        const obj = { [chainId]: [Object.assign({}, result)] };
                        this.onConfigSave(obj);
                        confirmationCallBack(true);
                        this.onDownload(obj);
                    }
                }
            };
            this.$eventBus = components_5.application.EventBus;
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
            this.stakingResult = new result_1.Result();
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
                        this.$render("i-vstack", { id: "wapperCampaignsButton", visible: store_4.isMultiple, verticalAlignment: "center" },
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
        components_5.customElements('staking-panel-config')
    ], PanelConfig);
    exports.PanelConfig = PanelConfig;
});
define("@staking/panel-config", ["require", "exports", "@staking/panel-config/panel-config.tsx"], function (require, exports, panel_config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PanelConfig = void 0;
    Object.defineProperty(exports, "PanelConfig", { enumerable: true, get: function () { return panel_config_1.PanelConfig; } });
});

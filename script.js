// 验证页面功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取验证页面元素
    const authPage = document.getElementById('auth-page');
    const mainContent = document.getElementById('main-content');
    const accessCodeInput = document.getElementById('access-code');
    const verifyBtn = document.getElementById('verify-btn');
    const errorMessage = document.getElementById('error-message');
    
    // 正确的内测码
    const CORRECT_ACCESS_CODE = '1231';
    const SPECIAL_ACCESS_CODE = 'lila'; // 特殊内测码，用于自动显示海鲜过敏提示
    
    // 验证函数
    function verifyAccessCode(code) {
        if (code === CORRECT_ACCESS_CODE) {
            // 验证成功 - 标准内测码
            errorMessage.classList.add('hidden');
            
            // 添加动画效果
            authPage.style.opacity = '0';
            authPage.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                authPage.style.display = 'none';
                mainContent.classList.remove('hidden');
                
                // 页面验证通过后，初始化其他功能
                initAllFeatures();
            }, 300);
            
            return true;
        } else if (code === SPECIAL_ACCESS_CODE) {
            // 验证成功 - 特殊内测码
            errorMessage.classList.add('hidden');
            
            // 添加动画效果
            authPage.style.opacity = '0';
            authPage.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                authPage.style.display = 'none';
                mainContent.classList.remove('hidden');
                
                // 页面验证通过后，初始化特殊功能 - 自动显示海鲜过敏提示
                initSpecialAllergenFeature();
            }, 300);
            
            return true;
        } else {
            // 验证失败
            errorMessage.classList.remove('hidden');
            accessCodeInput.value = '';
            accessCodeInput.focus();
            
            return false;
        }
    }
    
    // 验证按钮点击事件
    verifyBtn.addEventListener('click', function() {
        const code = accessCodeInput.value.trim();
        verifyAccessCode(code);
    });
    
    // 输入框回车事件
    accessCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const code = accessCodeInput.value.trim();
            verifyAccessCode(code);
        }
    });
    
    // 自动聚焦输入框
    accessCodeInput.focus();
});

// 页面验证通过后初始化所有功能
function initAllFeatures() {
    // 导航菜单交互
    initNavbar();
    
    // 初始化显示区域交互
    initDisplayArea();
    
    // 初始化分类筛选
    initCategoryFilter();
    
    // 初始化编辑功能
    initEditFeature();
    
    // 初始化Ask for功能
    initAskForFeature();
}

// 特殊内测码验证通过后初始化功能 - 自动设置海鲜过敏提示
function initSpecialAllergenFeature() {
    // 初始化所有基本功能，包括显示区域、分类筛选、编辑功能和Ask for功能
    initNavbar();
    initDisplayArea();
    initCategoryFilter();
    initEditFeature();
    initAskForFeature();
    
    // 查找过敏原卡片
    const allergenCard = document.querySelector('.phrase-card[data-chinese*="过敏"]');
    
    if (allergenCard) {
        // 设置固定的过敏提示文本
        const chineseText = '你好，我对海鲜、鱼虾过敏，请确保饭菜中不含海鲜、鱼虾以及海鲜和鱼虾的粉末、酱料。谢谢！';
        const englishText = 'Hello, I am allergic to seafood, fish and shrimp. Please make sure the meal does not contain seafood, fish, shrimp, or any powders or sauces made from them. Thank you!';
        
        // 直接更新卡片数据
        allergenCard.dataset.chinese = chineseText;
        allergenCard.dataset.english = englishText;
        allergenCard.dataset.editable = 'false'; // 禁用编辑功能
        
        // 移除编辑按钮（如果存在），确保用户无法编辑
        const editBtn = allergenCard.querySelector('.edit-template-btn');
        if (editBtn) {
            editBtn.remove();
        }
    }
    
    // 查找Phone Number (Last 4)卡片
    const phoneNumberCard = document.querySelector('.phrase-card[data-chinese*="手机号码后四位"]');
    
    if (phoneNumberCard) {
        // 设置固定的手机号后四位文本
        const chinesePhoneText = '我的手机号码后四位是：4245';
        const englishPhoneText = 'The last four digits of my phone number are: 4245';
        
        // 直接更新卡片数据
        phoneNumberCard.dataset.chinese = chinesePhoneText;
        phoneNumberCard.dataset.english = englishPhoneText;
        phoneNumberCard.dataset.editable = 'false'; // 禁用编辑功能
        
        // 移除编辑按钮（如果存在），确保用户无法编辑
        const phoneEditBtn = phoneNumberCard.querySelector('.edit-template-btn');
        if (phoneEditBtn) {
            phoneEditBtn.remove();
        }
    }
    
    // 即使初始化了编辑功能，由于我们将特殊卡片的data-editable设置为false并移除了编辑按钮，用户仍然无法修改这些卡片的信息
}

// 导航菜单交互
function initNavbar() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 移动端菜单切换
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // 点击导航链接关闭移动端菜单
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('shadow-sm');
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    

}

// 初始化Ask for功能
function initAskForFeature() {
    // 存储当前选中的请求项目
    const selectedItems = {}
    
    // 请求项目选项列表
    const requestItems = {
        // 餐具
        tableware: [
            'fork', 'knife', 'napkin', 'plate', 'chopsticks', 'spoon'
        ],
        // 菜单
        menu: [
            'menu', 'drink menu', 'wine list', 'dessert menu'
        ],
        // 调料
        condiments: [
            'salt', 'pepper', 'soy sauce', 'vinegar', 'ketchup', 
            'mustard', 'mayonnaise', 'chili sauce', 'sugar', 'oil',
            'water', 'hot water', 'ice water', 'ice'
        ],
        // 账单
        bill: [
            'bill', 'receipt', 'split bill'
        ]
    };
    
    // 英文到中文的映射
    const requestItemMap = {
        // 餐具
        'fork': '叉子',
        'knife': '刀',
        'napkin': '餐巾纸',
        'plate': '盘子',
        'chopsticks': '筷子',
        'spoon': '勺子',
        // 菜单
        'menu': '菜单',
        'drink menu': '饮料单',
        'wine list': '酒单',
        'dessert menu': '甜点菜单',
        // 调料
        'salt': '盐',
        'pepper': '胡椒',
        'soy sauce': '酱油',
        'vinegar': '醋',
        'ketchup': '番茄酱',
        'mustard': '芥末',
        'mayonnaise': '蛋黄酱',
        'chili sauce': '辣椒酱',
        'sugar': '糖',
        'oil': '油',
        'water': '水',
        'hot water': '热水',
        'ice water': '冰水',
        'ice': '冰块',
        // 账单
        'bill': '账单',
        'receipt': '收据',
        'split bill': '分开结账'
    };
    
    // 获取所有带有二级菜单的卡片
    const secondaryCards = document.querySelectorAll('.phrase-card[data-is-secondary="true"]');
    let askForCard = null;
    
    // 筛选出不是Customized Food的卡片
    secondaryCards.forEach(card => {
        const secondaryMenu = card.querySelector('.secondary-menu');
        if (secondaryMenu && !secondaryMenu.querySelector('#confirm-food-requirements')) {
            askForCard = card;
        }
    });
    
    if (!askForCard) return;
    
    // 重写二级菜单内容
    const secondaryMenu = askForCard.querySelector('.secondary-menu');
    if (!secondaryMenu) return;
    
    // 初始化选中的项目
    for (const category in requestItems) {
        selectedItems[category] = new Set();
    }
    
    // 更新二级菜单HTML
    let menuHTML = '';
    
    // 添加餐具
    menuHTML += `
        <h4 class="font-medium text-neutral-dark mb-3">Tableware:</h4>
        <div class="mb-4">
            <div class="grid grid-cols-3 gap-2">`;
    
    requestItems.tableware.forEach(item => {
        menuHTML += `
                <label class="flex items-center p-2 bg-neutral hover:bg-neutral-light rounded cursor-pointer">
                    <input type="checkbox" class="request-item-checkbox mr-2" 
                           data-type="tableware" data-item="${item}">
                    <span class="text-sm">${item}</span>
                </label>`;
    });
    
    menuHTML += `
            </div>
        </div>`;
    
    // 添加菜单
    menuHTML += `
        <h4 class="font-medium text-neutral-dark mb-3">Menu:</h4>
        <div class="mb-4">
            <div class="grid grid-cols-3 gap-2">`;
    
    requestItems.menu.forEach(item => {
        menuHTML += `
                <label class="flex items-center p-2 bg-neutral hover:bg-neutral-light rounded cursor-pointer">
                    <input type="checkbox" class="request-item-checkbox mr-2" 
                           data-type="menu" data-item="${item}">
                    <span class="text-sm">${item}</span>
                </label>`;
    });
    
    menuHTML += `
            </div>
        </div>`;
    
    // 添加调料
    menuHTML += `
        <h4 class="font-medium text-neutral-dark mb-3">Condiments:</h4>
        <div class="mb-4">
            <div class="grid grid-cols-3 gap-2">`;
    
    requestItems.condiments.forEach(item => {
        menuHTML += `
                <label class="flex items-center p-2 bg-neutral hover:bg-neutral-light rounded cursor-pointer">
                    <input type="checkbox" class="request-item-checkbox mr-2" 
                           data-type="condiments" data-item="${item}">
                    <span class="text-sm">${item}</span>
                </label>`;
    });
    
    menuHTML += `
            </div>
        </div>`;
    
    // 添加账单
    menuHTML += `
        <h4 class="font-medium text-neutral-dark mb-3">Bill:</h4>
        <div class="mb-4">
            <div class="grid grid-cols-3 gap-2">`;
    
    requestItems.bill.forEach(item => {
        menuHTML += `
                <label class="flex items-center p-2 bg-neutral hover:bg-neutral-light rounded cursor-pointer">
                    <input type="checkbox" class="request-item-checkbox mr-2" 
                           data-type="bill" data-item="${item}">
                    <span class="text-sm">${item}</span>
                </label>`;
    });
    
    menuHTML += `
            </div>
        </div>`;
    
    // 添加确认按钮
    menuHTML += `
        <!-- 确认按钮 -->
        <div class="flex justify-end mt-4">
            <button id="confirm-ask-for" class="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors">
                Confirm
            </button>
        </div>
    `;
    
    secondaryMenu.innerHTML = menuHTML;
    
    // 为复选框添加事件监听器
    secondaryMenu.querySelectorAll('.request-item-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const type = this.dataset.type;
            const item = this.dataset.item;
            
            if (this.checked) {
                selectedItems[type].add(item);
            } else {
                selectedItems[type].delete(item);
            }
        });
    });
    
    // 为确认按钮添加事件监听器
    const confirmButton = secondaryMenu.querySelector('#confirm-ask-for');
    confirmButton.addEventListener('click', function() {
        const displayPhrase = document.getElementById('display-phrase');
        const displayEnglish = document.getElementById('display-english');
        const displayContainer = document.getElementById('display-container');
        
        // 生成中文结果
        let chineseResult = '你好，';
        let englishResult = 'Hello, ';
        
        // 检查是否有选中的项目
        let hasSelectedItems = false;
        for (const category in selectedItems) {
            if (selectedItems[category].size > 0) {
                hasSelectedItems = true;
                break;
            }
        }
        
        // 如果没有选择任何项目，显示提示信息
        if (!hasSelectedItems) {
            chineseResult += '请给我相应的物品。谢谢！';
            englishResult += 'please give me the corresponding items. Thank you!';
        } else {
            // 按类别生成请求
            let requests = [];
            
            // 餐具
            if (selectedItems.tableware.size > 0) {
                const tablewareList = Array.from(selectedItems.tableware).map(item => requestItemMap[item] || item);
                requests.push('请给我' + tablewareList.join('、'));
                englishResult += 'please give me ' + Array.from(selectedItems.tableware).join(', ') + '; ';
            }
            
            // 菜单
            if (selectedItems.menu.size > 0) {
                const menuList = Array.from(selectedItems.menu).map(item => requestItemMap[item] || item);
                requests.push('请给我' + menuList.join('、'));
                englishResult += 'please give me the ' + Array.from(selectedItems.menu).join(', ') + '; ';
            }
            
            // 调料
            if (selectedItems.condiments.size > 0) {
                const condimentList = Array.from(selectedItems.condiments).map(item => requestItemMap[item] || item);
                requests.push('请给我' + condimentList.join('、'));
                englishResult += 'please give me ' + Array.from(selectedItems.condiments).join(', ') + '; ';
            }
            
            // 账单
            if (selectedItems.bill.size > 0) {
                const billList = Array.from(selectedItems.bill).map(item => requestItemMap[item] || item);
                requests.push('请给我' + billList.join('、'));
                englishResult += 'please give me the ' + Array.from(selectedItems.bill).join(', ') + '; ';
            }
            
            // 组合请求
            chineseResult += requests.join('；') + '。谢谢！';
            
            // 移除英文结果最后一个分号并添加结尾
            englishResult = englishResult.slice(0, -2) + '. Thank you!';
        }
        
        // 添加切换动画
        displayContainer.classList.add('display-box-hidden');
        
        setTimeout(() => {
            displayPhrase.textContent = chineseResult;
            displayEnglish.textContent = englishResult;
            displayContainer.classList.remove('display-box-hidden');
            
            // 滚动到显示区域
            document.getElementById('home').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // 隐藏二级菜单
            secondaryMenu.classList.add('hidden');
        }, 300);
    });
}

// 初始化支付方式选项功能
function initPaymentOptions() {
    // 支付方式选项列表
    const paymentOptions = [
        { zh: '现金', en: 'Cash' },
        { zh: '支付宝/微信支付', en: 'Alipay/WeChat Pay' },
        { zh: '银联卡', en: 'UnionPay Card' },
        { zh: 'Visa/MasterCard', en: 'Visa/MasterCard' },
        { zh: '其他', en: 'Other' }
    ];
    
    // 为显示区域添加支付方式选项容器
    let paymentOptionsContainer = document.getElementById('payment-options-container');
    if (!paymentOptionsContainer) {
        paymentOptionsContainer = document.createElement('div');
        paymentOptionsContainer.id = 'payment-options-container';
        paymentOptionsContainer.className = 'payment-options hidden mt-4 p-4 bg-neutral rounded-lg';
        
        // 获取显示区域
        const displayContainer = document.getElementById('display-container');
        if (displayContainer) {
            displayContainer.appendChild(paymentOptionsContainer);
        }
    }
    
    // 生成支付方式选项HTML
    // 调整为grid-cols-1在移动端显示更好，并增加padding避免文字溢出
    let optionsHTML = `
        <h4 class="font-medium text-neutral-dark mb-3">Payment Options:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">`;
        
    paymentOptions.forEach((option, index) => {
        optionsHTML += `
            <div class="payment-option p-4 bg-white hover:bg-green-100 border border-green-200 rounded-lg cursor-pointer transition-all duration-200 text-center" 
                 data-index="${index}" data-zh="${option.zh}" data-en="${option.en}">
                <div class="font-medium break-words">${option.zh}</div>
                <div class="text-sm text-neutral-dark/60 break-words">${option.en}</div>
            </div>`;
    });
    
    optionsHTML += `
        </div>
    `;
    
    paymentOptionsContainer.innerHTML = optionsHTML;
    
    // 为支付方式选项添加点击事件
    paymentOptionsContainer.querySelectorAll('.payment-option').forEach(option => {
        option.addEventListener('click', function() {
            // 实现多选功能：切换当前选项的选中状态，不移除其他选项的选中状态
            if (this.classList.contains('bg-green-200')) {
                // 取消选中
                this.classList.remove('bg-green-200', 'border-green-500', 'text-green-800');
                this.classList.add('bg-white', 'border-green-200');
            } else {
                // 选中 - 使用更明显的绿色高亮效果
                this.classList.remove('bg-white', 'border-green-200');
                this.classList.add('bg-green-200', 'border-green-500', 'text-green-800');
            }
            
            // 不再在中文区域显示选择结果，只保持按钮高亮
            // 保留原始的显示内容
        });
    });
    
    return paymentOptionsContainer;
}

// 初始化食物要求功能
function initFoodRequirements() {
    // 存储当前选中的食物要求
    const selectedRequirements = {
        remove: new Set(), // 不要的原料
        less: new Set(),   // 少要的原料
        more: new Set()    // 多要的原料
    };
    
    // 食物原料选项列表
    const ingredientOptions = [
        'peanuts', 'cilantro', 'garlic', 'onion', 'salt', 'sugar', 
        'pepper', 'chili', 'oil', 'soy sauce', 'vinegar', 'sesame',
        'seafood', 'fish', 'shrimp', 'crab', 'shellfish'
    ];
    
    // 中文到英文的映射
    const ingredientMap = {
        '花生': 'peanuts',
        '香菜': 'cilantro',
        '大蒜': 'garlic',
        '洋葱': 'onion',
        '盐': 'salt',
        '糖': 'sugar',
        '胡椒': 'pepper',
        '辣椒': 'chili',
        '油': 'oil',
        '酱油': 'soy sauce',
        '醋': 'vinegar',
        '芝麻': 'sesame',
        '海鲜': 'seafood',
        '鱼': 'fish',
        '虾': 'shrimp',
        '螃蟹': 'crab',
        '贝类': 'shellfish'
    };
    
    // 英文到中文的映射
    const reverseIngredientMap = {};
    for (const [zh, en] of Object.entries(ingredientMap)) {
        reverseIngredientMap[en] = zh;
    }
    
    // 获取No Ingredients卡片
    const noIngredientsCard = document.querySelector('.phrase-card[data-is-secondary="true"]');
    if (!noIngredientsCard) return;
    
    // 重写二级菜单内容
    const secondaryMenu = noIngredientsCard.querySelector('.secondary-menu');
    if (!secondaryMenu) return;
    
    // 更新二级菜单HTML
    let menuHTML = `
        <h4 class="font-medium text-neutral-dark mb-3">Custom Food Requirements:</h4>
        
        <!-- 不要的原料 -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-neutral-dark mb-2">Exclude ingredients:</label>
            <div class="grid grid-cols-3 gap-2">`;
            
    ingredientOptions.forEach(ingredient => {
        menuHTML += `
                <label class="flex items-center p-2 bg-neutral hover:bg-neutral-light rounded cursor-pointer">
                    <input type="checkbox" class="ingredient-checkbox mr-2" 
                           data-type="remove" data-ingredient="${ingredient}">
                    <span class="text-sm">${ingredient}</span>
                </label>`;
    });
    
    menuHTML += `
            </div>
        </div>
        
        <!-- 少要的原料 -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-neutral-dark mb-2">Reduce ingredients:</label>
            <div class="grid grid-cols-3 gap-2">`;
            
    ingredientOptions.forEach(ingredient => {
        menuHTML += `
                <label class="flex items-center p-2 bg-neutral hover:bg-neutral-light rounded cursor-pointer">
                    <input type="checkbox" class="ingredient-checkbox mr-2" 
                           data-type="less" data-ingredient="${ingredient}">
                    <span class="text-sm">${ingredient}</span>
                </label>`;
    });
    
    menuHTML += `
            </div>
        </div>
        
        <!-- 多要的原料 -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-neutral-dark mb-2">Extra ingredients:</label>
            <div class="grid grid-cols-3 gap-2">`;
            
    ingredientOptions.forEach(ingredient => {
        menuHTML += `
                <label class="flex items-center p-2 bg-neutral hover:bg-neutral-light rounded cursor-pointer">
                    <input type="checkbox" class="ingredient-checkbox mr-2" 
                           data-type="more" data-ingredient="${ingredient}">
                    <span class="text-sm">${ingredient}</span>
                </label>`;
    });
    
    menuHTML += `
            </div>
        </div>
        
        <!-- 确认按钮 -->
        <div class="flex justify-end mt-4">
            <button id="confirm-food-requirements" class="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors">
                Confirm
            </button>
        </div>
    `;
    
    secondaryMenu.innerHTML = menuHTML;
    
    // 为复选框添加事件监听器
    secondaryMenu.querySelectorAll('.ingredient-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const type = this.dataset.type;
            const ingredient = this.dataset.ingredient;
            
            if (this.checked) {
                selectedRequirements[type].add(ingredient);
            } else {
                selectedRequirements[type].delete(ingredient);
            }
        });
    });
    
    // 为确认按钮添加事件监听器
    const confirmButton = secondaryMenu.querySelector('#confirm-food-requirements');
    confirmButton.addEventListener('click', function() {
        const displayPhrase = document.getElementById('display-phrase');
        const displayEnglish = document.getElementById('display-english');
        const displayContainer = document.getElementById('display-container');
        
        // 生成中文结果
        let chineseResult = '你好，';
        let englishResult = 'Hello, ';
        
        // 添加不要的原料
        if (selectedRequirements.remove.size > 0) {
            const removeList = Array.from(selectedRequirements.remove).map(ing => reverseIngredientMap[ing] || ing);
            chineseResult += '请不要放' + removeList.join('、') + '；';
            englishResult += 'please don\'t add ' + Array.from(selectedRequirements.remove).join(', ') + '; ';
        }
        
        // 添加少要的原料
        if (selectedRequirements.less.size > 0) {
            const lessList = Array.from(selectedRequirements.less).map(ing => reverseIngredientMap[ing] || ing);
            chineseResult += '请少放' + lessList.join('、') + '；';
            englishResult += 'please use less ' + Array.from(selectedRequirements.less).join(', ') + '; ';
        }
        
        // 添加多要的原料
        if (selectedRequirements.more.size > 0) {
            const moreList = Array.from(selectedRequirements.more).map(ing => reverseIngredientMap[ing] || ing);
            chineseResult += '请多放' + moreList.join('、') + '；';
            englishResult += 'please use more ' + Array.from(selectedRequirements.more).join(', ') + '; ';
        }
        
        // 如果没有选择任何要求，显示提示信息
        if (selectedRequirements.remove.size === 0 && 
            selectedRequirements.less.size === 0 && 
            selectedRequirements.more.size === 0) {
            chineseResult += '请按照您的标准制作即可。谢谢！';
            englishResult += 'please prepare according to your standard. Thank you!';
        } else {
            // 移除最后一个分号并添加结尾
            chineseResult = chineseResult.slice(0, -1) + '。谢谢！';
            englishResult = englishResult.slice(0, -2) + '. Thank you!';
        }
        
        // 添加切换动画
        displayContainer.classList.add('display-box-hidden');
        
        setTimeout(() => {
            displayPhrase.textContent = chineseResult;
            displayEnglish.textContent = englishResult;
            displayContainer.classList.remove('display-box-hidden');
            
            // 滚动到显示区域
            document.getElementById('home').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // 隐藏二级菜单
            secondaryMenu.classList.add('hidden');
        }, 300);
    });
}

// 初始化编辑功能
function initEditFeature() {
    // 创建编辑模态框
    const modalHTML = `
        <div id="edit-modal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden">
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
                <div class="bg-primary text-white p-4 flex justify-between items-center">
                    <h3 class="text-lg font-bold" id="edit-modal-title">Edit Personal Information</h3>
                    <button id="close-modal" class="text-white hover:text-gray-200">
                        <i class="fa fa-times text-xl"></i>
                    </button>
                </div>
                <div class="p-6" id="edit-modal-content">
                    <!-- 编辑表单将动态生成 -->
                </div>
                <div class="bg-gray-50 p-4 flex justify-end">
                    <button id="cancel-edit" class="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2 hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button id="save-edit" class="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const editModal = document.getElementById('edit-modal');
    const closeModal = document.getElementById('close-modal');
    const cancelEdit = document.getElementById('cancel-edit');
    const saveEdit = document.getElementById('save-edit');
    const editModalContent = document.getElementById('edit-modal-content');
    const editModalTitle = document.getElementById('edit-modal-title');
    
    // 存储当前正在编辑的短语卡片
    let currentEditableCard = null;
    
    // 关闭模态框
    function hideModal() {
        editModal.classList.add('hidden');
        editModalContent.innerHTML = '';
        currentEditableCard = null;
    }
    
    closeModal.addEventListener('click', hideModal);
    cancelEdit.addEventListener('click', hideModal);
    
    // 点击模态框外部关闭
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            hideModal();
        }
    });
    
    // 简单的中英文翻译词典
    const simpleTranslator = {
        // 常见过敏原英文到中文的映射表 - 扩大版，包含所有常见的食物、饮料和成分
        allergenTranslations: {
            // 基础食物类别
            'bean': '豆类',
            'seafood': '海鲜',
            'shellfish': '贝类',
            'peanut': '花生',
            'nut': '坚果',
            'milk': '牛奶',
            'egg': '鸡蛋',
            'wheat': '小麦',
            'soy': '大豆',
            'gluten': '麸质',
            'fish': '鱼类',
            'corn': '玉米',
            'sesame': '芝麻',
            'celery': '芹菜',
            'mustard': '芥末',
            'sulfite': '亚硫酸盐',
            'lactose': '乳糖',
            
            // 更多常见食物和饮料
            'apple': '苹果',
            'banana': '香蕉',
            'orange': '橙子',
            'grape': '葡萄',
            'strawberry': '草莓',
            'blueberry': '蓝莓',
            'pear': '梨',
            'peach': '桃子',
            'cherry': '樱桃',
            'watermelon': '西瓜',
            'mango': '芒果',
            'pineapple': '菠萝',
            'kiwi': '猕猴桃',
            'lemon': '柠檬',
            'lime': '青柠',
            'coconut': '椰子',
            'avocado': '牛油果',
            'tomato': '番茄',
            'potato': '土豆',
            'carrot': '胡萝卜',
            'onion': '洋葱',
            'garlic': '大蒜',
            'ginger': '姜',
            'cucumber': '黄瓜',
            'lettuce': '生菜',
            'spinach': '菠菜',
            'broccoli': '西兰花',
            'cauliflower': '花椰菜',
            'cabbage': '卷心菜',
            'asparagus': '芦笋',
            'zucchini': '西葫芦',
            'eggplant': '茄子',
            'bell pepper': '甜椒',
            'chili pepper': '辣椒',
            'mushroom': '蘑菇',
            'olive': '橄榄',
            'pickle': '泡菜',
            'cucumber': '黄瓜',
            
            // 肉类和蛋白质
            'chicken': '鸡肉',
            'beef': '牛肉',
            'pork': '猪肉',
            'lamb': '羊肉',
            'turkey': '火鸡',
            'duck': '鸭肉',
            'goat': '羊肉',
            'rabbit': '兔肉',
            'quail': '鹌鹑',
            'venison': '鹿肉',
            'bacon': '培根',
            'sausage': '香肠',
            'ham': '火腿',
            'salami': '萨拉米',
            'fish': '鱼',
            'salmon': '三文鱼',
            'tuna': '金枪鱼',
            'shrimp': '虾',
            'crab': '螃蟹',
            'lobster': '龙虾',
            'mussel': '贻贝',
            'oyster': '牡蛎',
            'scallop': '扇贝',
            'squid': '鱿鱼',
            'octopus': '章鱼',
            
            // 乳制品
            'milk': '牛奶',
            'cheese': '奶酪',
            'yogurt': '酸奶',
            'butter': '黄油',
            'cream': '奶油',
            'ice cream': '冰淇淋',
            'sour cream': '酸奶油',
            'cottage cheese': '农家奶酪',
            'ricotta': '里科塔奶酪',
            'mozzarella': '马苏里拉奶酪',
            'cheddar': '切达奶酪',
            'parmesan': '帕玛森奶酪',
            'brie': '布里奶酪',
            'camembert': '卡门贝尔奶酪',
            
            // 坚果和种子
            'almond': '杏仁',
            'walnut': '核桃',
            'pecan': '山核桃',
            'hazelnut': '榛子',
            'macadamia': '夏威夷果',
            'pistachio': '开心果',
            'cashew': '腰果',
            'brazil nut': '巴西坚果',
            'pumpkin seed': '南瓜籽',
            'sunflower seed': '葵花籽',
            'chia seed': '奇亚籽',
            'flaxseed': '亚麻籽',
            'hemp seed': '火麻仁',
            
            // 谷物和淀粉类
            'wheat': '小麦',
            'oats': '燕麦',
            'rice': '大米',
            'barley': '大麦',
            'rye': '黑麦',
            'quinoa': '藜麦',
            'buckwheat': '荞麦',
            'millet': '小米',
            'couscous': '古斯米',
            'pasta': '意大利面',
            'noodle': '面条',
            'bread': '面包',
            'cake': '蛋糕',
            'cookie': '饼干',
            'biscuit': '饼干',
            'pastry': '糕点',
            'croissant': '可颂面包',
            'bagel': '百吉饼',
            
            // 豆类和豆制品
            'soybean': '大豆',
            'tofu': '豆腐',
            'tempeh': '天贝',
            'miso': '味噌',
            'edamame': '毛豆',
            'lentil': '小扁豆',
            'chickpea': '鹰嘴豆',
            'kidney bean': '红芸豆',
            'black bean': '黑豆',
            'pinto bean': '花豆',
            'navy bean': '海军豆',
            'split pea': '豌豆',
            
            // 调味料和香料
            'salt': '盐',
            'sugar': '糖',
            'pepper': '胡椒',
            'cinnamon': '肉桂',
            'vanilla': '香草',
            'garlic': '大蒜',
            'onion': '洋葱',
            'ginger': '姜',
            'turmeric': '姜黄',
            'curry': '咖喱',
            'cumin': '孜然',
            'paprika': '红椒粉',
            'chili powder': '辣椒粉',
            'oregano': '牛至',
            'basil': '罗勒',
            'thyme': '百里香',
            'rosemary': '迷迭香',
            'sage': '鼠尾草',
            'mint': '薄荷',
            'coriander': '香菜',
            'parsley': '欧芹',
            'dill': '莳萝',
            'bay leaf': '月桂叶',
            
            // 饮料
            'water': '水',
            'tea': '茶',
            'coffee': '咖啡',
            'juice': '果汁',
            'soda': '苏打水',
            'cola': '可乐',
            'beer': '啤酒',
            'wine': '葡萄酒',
            'whiskey': '威士忌',
            'vodka': '伏特加',
            'gin': '杜松子酒',
            'rum': '朗姆酒',
            'brandy': '白兰地',
            'liqueur': '利口酒',
            'milk': '牛奶',
            'soy milk': '豆浆',
            'almond milk': '杏仁奶',
            'oat milk': '燕麦奶',
            'coconut milk': '椰奶',
            
            // 其他常见成分
            'chocolate': '巧克力',
            'honey': '蜂蜜',
            'maple syrup': '枫糖浆',
            'jam': '果酱',
            'jelly': '果冻',
            'marmalade': '橘子果酱',
            'peanut butter': '花生酱',
            'nutella': '能多益巧克力酱',
            'ketchup': '番茄酱',
            'mustard': '芥末',
            'mayonnaise': '蛋黄酱',
            'salsa': '莎莎酱',
            'guacamole': '鳄梨酱',
            'tahini': '芝麻酱',
            'hummus': '鹰嘴豆泥',
            'vinegar': '醋',
            'oil': '油',
            'olive oil': '橄榄油',
            'vegetable oil': '植物油',
            'cooking oil': '食用油',
            'butter': '黄油',
            'margarine': '人造黄油',
            
            // 添加剂和防腐剂
            'monosodium glutamate': '味精',
            'msg': '味精',
            'preservative': '防腐剂',
            'artificial flavor': '人工香料',
            'artificial color': '人工色素',
            'sweetener': '甜味剂',
            'aspartame': '阿斯巴甜',
            'sucralose': '三氯蔗糖',
            'stevia': '甜菊糖',
            
            // 其他可能的过敏原
            'sulfite': '亚硫酸盐',
            'lactose': '乳糖',
            'casein': '酪蛋白',
            'gelatin': '明胶',
            'yeast': '酵母',
            'mold': '霉菌',
            'pollen': '花粉'
        },
        
        // 英文到中文的基础翻译
        enToZh: {
            'hello': '你好',
            'thank you': '谢谢',
            'please': '请',
            'sorry': '对不起',
            'yes': '是',
            'no': '否',
            'how much': '多少钱',
            'where': '在哪里',
            'I need': '我需要',
            'help': '帮助',
            'water': '水',
            'food': '食物',
            'restroom': '洗手间',
            'phone': '手机',
            'number': '号码',
            'name': '名字',
            'address': '地址',
            'hotel': '酒店',
            'taxi': '出租车',
            'restaurant': '餐厅',

            'spicy': '辣的',
            'non-spicy': '不辣的',
            'hot': '热的',
            'cold': '冷的'
        },
        
        // 中文到英文的基础翻译
        zhToEn: {
            '你好': 'hello',
            '谢谢': 'thank you',
            '请': 'please',
            '对不起': 'sorry',
            '是': 'yes',
            '否': 'no',
            '多少钱': 'how much',
            '在哪里': 'where',
            '我需要': 'I need',
            '帮助': 'help',
            '水': 'water',
            '食物': 'food',
            '洗手间': 'restroom',
            '手机': 'phone',
            '号码': 'number',
            '名字': 'name',
            '地址': 'address',
            '酒店': 'hotel',
            '出租车': 'taxi',
            '餐厅': 'restaurant',

            '辣的': 'spicy',
            '不辣的': 'non-spicy',
            '热的': 'hot',
            '冷的': 'cold'
        },
        
        // 翻译函数 - 增强版，支持大小写和单复数形式
        translate: function(text, sourceLang, targetLang) {
            if (!text || typeof text !== 'string' || text.trim() === '') {
                return text;
            }
            
            // 如果源语言和目标语言相同，直接返回
            if (sourceLang === targetLang) {
                return text;
            }
            
            let translatedText = text;
            
            // 处理过敏原特殊翻译
            if (sourceLang === 'en' && targetLang === 'zh') {
                // 英文到中文翻译
                // 按单词分割文本进行处理
                const words = translatedText.split(/(\s+)/);
                const translatedWords = words.map(word => {
                    // 跳过空白字符
                    if (/^\s*$/.test(word)) return word;
                    
                    const normalizedWord = word.toLowerCase();
                    
                    // 首先尝试精确匹配
                    let translation = this.allergenTranslations[normalizedWord];
                    
                    if (!translation) {
                        // 处理常见的复数形式
                        const pluralRules = [
                            // 处理以s结尾的常规复数
                            { pattern: /s$/, replacement: '' },
                            // 处理以es结尾的复数 (如 tomatoes, potatoes)
                            { pattern: /es$/, replacement: '' },
                            // 处理以ies结尾的复数 (如 cherries, berries)
                            { pattern: /ies$/, replacement: 'y' },
                            // 处理以ves结尾的复数 (如 leaves, halves)
                            { pattern: /ves$/, replacement: 'f' },
                            // 处理特殊情况
                            { pattern: /species$/, replacement: 'species' },
                            { pattern: /sheep$/, replacement: 'sheep' },
                            { pattern: /fish$/, replacement: 'fish' }
                        ];
                        
                        // 尝试处理复数形式后匹配
                        for (const rule of pluralRules) {
                            if (rule.pattern.test(normalizedWord)) {
                                const singularForm = normalizedWord.replace(rule.pattern, rule.replacement);
                                translation = this.allergenTranslations[singularForm];
                                if (translation) {
                                    break;
                                }
                            }
                        }
                    }
                    
                    // 如果还是没有找到，尝试部分匹配（针对复合词）
                    if (!translation) {
                        for (const [key, value] of Object.entries(this.allergenTranslations)) {
                            if (normalizedWord.includes(key)) {
                                translation = value;
                                break;
                            }
                        }
                    }
                    
                    return translation || word;
                });
                
                translatedText = translatedWords.join('');
                
                // 应用基础翻译
                Object.keys(this.enToZh).forEach(key => {
                    const regex = new RegExp(`\\b${key}\\b`, 'gi');
                    translatedText = translatedText.replace(regex, this.enToZh[key]);
                });
            } else if (sourceLang === 'zh' && targetLang === 'en') {
                // 中文到英文翻译
                Object.keys(this.zhToEn).forEach(key => {
                    const regex = new RegExp(key, 'gi');
                    translatedText = translatedText.replace(regex, this.zhToEn[key]);
                });
            }
            
            return translatedText;
        },
        
        // 检测语言
        detectLanguage: function(text) {
            if (!text || typeof text !== 'string') {
                return 'unknown';
            }
            
            // 简单的语言检测：如果包含中文字符，则认为是中文
            const chineseRegex = /[\u4e00-\u9fff]/;
            return chineseRegex.test(text) ? 'zh' : 'en';
        }
    };
    
    // 保存编辑
saveEdit.addEventListener('click', () => {
    if (!currentEditableCard) return;
    
    const template = currentEditableCard.getAttribute('data-template');
    const inputs = document.querySelectorAll('#edit-modal-content input');
    
    // 使用data-chinese作为唯一标识符
    const cardId = currentEditableCard.getAttribute('data-chinese');
    
    // 构建更新后的中文短语和英文短语
    let updatedPhrase = template;
    let updatedEnglishPhrase = currentEditableCard.getAttribute('data-english');
    const inputsData = {};
    let hasError = false;
    
    inputs.forEach(input => {
        const placeholder = input.getAttribute('data-placeholder');
        const placeholderKey = placeholder.replace(/[{}]/g, ''); // 移除花括号
        let value = input.value;
        const originalValue = input.value; // 保存原始输入值
        
        // 验证数字输入
        if (placeholderKey === 'days') {
            // 检查是否为纯数字
            if (!/^\d+$/.test(value)) {
                showToast('Please enter only numbers for days', 'error');
                hasError = true;
                return; // 停止处理当前输入
            }
        }
        
        // 如果已经有错误，跳过后续处理
        if (hasError) {
            return;
        }
        
        // 检查是否是过敏原卡片并且输入的是英文
        if (placeholderKey === 'allergen' && /^[a-zA-Z\s]+$/.test(value)) {
            // 转换为小写进行匹配
            const lowerValue = value.toLowerCase().trim();
            // 先尝试直接匹配
            let translatedValue = simpleTranslator.allergenTranslations[lowerValue];
            
            // 如果没有直接匹配，尝试处理复数形式
            if (!translatedValue) {
                // 移除常见的复数结尾 "s"
                if (lowerValue.endsWith('s') && lowerValue.length > 1) {
                    const singularForm = lowerValue.slice(0, -1);
                    translatedValue = simpleTranslator.allergenTranslations[singularForm];
                }
            }
            
            // 如果找到对应的中文翻译，则使用翻译
            if (translatedValue) {
                value = translatedValue;
            }
        }
        
        // 对于非过敏原卡片，如果输入的是英文，尝试翻译为中文
        if (placeholderKey !== 'allergen' && /^[a-zA-Z\s\d]+$/.test(value)) {
            const translatedValue = simpleTranslator.translate(value, 'en', 'zh');
            if (translatedValue !== value) {
                // 如果翻译结果不同，则同时保存原始值和翻译值
                updatedPhrase = updatedPhrase.replaceAll(placeholder, `${value} (${translatedValue})`);
            }
        }
        
        updatedPhrase = updatedPhrase.replaceAll(placeholder, value); // 使用replaceAll替换所有匹配项
        
        // 对于所有卡片，同时更新英文短语中的占位符
        if (updatedEnglishPhrase && updatedEnglishPhrase.includes(placeholder)) {
            updatedEnglishPhrase = updatedEnglishPhrase.replaceAll(placeholder, originalValue);
        }
        
        inputsData[placeholderKey] = originalValue; // 保存原始输入值，便于后续编辑
    });
    
    // 如果有错误，不保存编辑
    if (hasError) {
        return; // 停止保存操作
    }
        
        // 对于过敏原卡片，添加免责条款
        if (template.includes('{allergen}') && template.includes('过敏')) {
            // 移除已有的免责声明，重新添加统一格式
            updatedPhrase = updatedPhrase.replace(/<br><br><div style=[\s\S]*?<\/div>/, '');
            if (updatedEnglishPhrase) {
                updatedEnglishPhrase = updatedEnglishPhrase.replace(/\n\n<div style=[\s\S]*?<\/div>/, '');
            }
            
            // 创建统一的免责声明样式和内容
            const disclaimerClass = 'allergen-disclaimer';
            const disclaimerStyle = `
                <style>
                    .${disclaimerClass} {
                        font-size: 0.7em !important;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.4 !important;
                        font-weight: 400 !important;
                        color: #374151;
                        background-color: #fffbeb;
                        border-left: 4px solid #f59e0b;
                        padding: 8px 12px;
                        border-radius: 4px;
                        margin-top: 10px;
                    }
                    .${disclaimerClass} strong {
                        font-size: 0.7em !important;
                        font-weight: 600 !important;
                    }
                </style>
            `;
            
            // 确保样式只添加一次
            if (!document.getElementById('allergen-disclaimer-style')) {
                const styleElement = document.createElement('style');
                styleElement.id = 'allergen-disclaimer-style';
                styleElement.textContent = `
                    .${disclaimerClass} {
                        font-size: 0.7em !important;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.4 !important;
                        font-weight: 400 !important;
                        color: #374151;
                        background-color: #fffbeb;
                        border-left: 4px solid #f59e0b;
                        padding: 8px 12px;
                        border-radius: 4px;
                        margin-top: 10px;
                    }
                    .${disclaimerClass} strong {
                        font-size: 0.7em !important;
                        font-weight: 600 !important;
                    }
                `;
                document.head.appendChild(styleElement);
            }
            
            // 只在英文部分添加统一的免责声明，确保位于英文翻译下方
            if (updatedEnglishPhrase) {
                updatedEnglishPhrase += '\n\n<div class="' + disclaimerClass + '">[Disclaimer]: The above information is self-reported by the user and is <strong>for reference only</strong>. Please confirm with the service staff according to the actual situation to avoid food allergic reactions.</div>';
                updatedEnglishPhrase += '\n\n<div class="' + disclaimerClass + '">【免责声明】：以上信息为用户自行输入，<strong>仅供参考</strong>。请根据实际情况与服务人员进行确认，避免发生食物过敏反应。</div>';
            }
        }
        
        // 更新卡片的data-chinese属性
        currentEditableCard.setAttribute('data-chinese', updatedPhrase);
        // 同时更新卡片的data-english属性
        currentEditableCard.setAttribute('data-english', updatedEnglishPhrase);
        
        // 不保存到本地存储，仅在当前会话中保持
        console.log('Edit data saved in session only');
        
        // 保存后自动显示结果
        const displayPhrase = document.getElementById('display-phrase');
        const displayEnglish = document.getElementById('display-english');
        const displayContainer = document.getElementById('display-container');
        
        // 添加切换动画
        displayContainer.classList.add('display-box-hidden');
        
        setTimeout(() => {
            // 设置显示区域内容
            if (updatedPhrase.includes('<')) {
                displayPhrase.innerHTML = updatedPhrase;
            } else {
                displayPhrase.textContent = updatedPhrase;
            }
            
            if (updatedEnglishPhrase && updatedEnglishPhrase.trim() !== '') {
                if (updatedEnglishPhrase.includes('<')) {
                    displayEnglish.innerHTML = updatedEnglishPhrase;
                } else {
                    displayEnglish.textContent = updatedEnglishPhrase;
                }
            }
            
            displayContainer.classList.remove('display-box-hidden');
            
            // 滚动到显示区域
            document.getElementById('home').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);
        
        hideModal();
        showToast('Changes saved successfully!');
    });
    
    // 处理编辑按钮点击
    function setupEditButtons() {
        document.querySelectorAll('.phrase-card[data-editable="true"]').forEach(card => {
            // 获取编辑按钮（HTML中已存在的按钮）
            const editButton = card.querySelector('.edit-template-btn');
            
            if (editButton) {
                editButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openEditModal(card);
                });
            }
        });
    }
    
    // 打开编辑模态框
    function openEditModal(card) {
        currentEditableCard = card;
        const template = card.getAttribute('data-template');
        // 获取卡片标题
        const cardTitle = card.querySelector('h3').textContent;
        
        editModalTitle.textContent = `Edit: ${cardTitle}`;
        
        // 提取模板中的占位符（匹配单花括号格式）
        const placeholders = [];
        const placeholderRegex = /\{(.*?)\}/g;
        let match;
        while ((match = placeholderRegex.exec(template)) !== null) {
            if (!placeholders.includes(match[1])) {
                placeholders.push(match[1]);
            }
        }
        
        // 使用卡片的data-chinese属性作为唯一标识符（因为没有id属性）
        const cardId = card.getAttribute('data-chinese');
        
        // 生成编辑表单
        let formHTML = '';
        placeholders.forEach(placeholder => {
            const displayName = placeholder.charAt(0).toUpperCase() + placeholder.slice(1); // 首字母大写
            // 不使用本地存储的值，每次都初始化为空
            const defaultValue = '';
            // 根据占位符类型设置不同的输入类型
                        let inputType = 'text';
                        if (placeholder === 'days') {
                            inputType = 'number';
                        }
                        
                        formHTML += `
                <div class="mb-4">
                    <label for="${placeholder}" class="block text-sm font-medium text-gray-700 mb-1">
                        ${displayName}
                    </label>
                    <input
                        type="${inputType}"
                        id="${placeholder}"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        value="${defaultValue}"
                        data-placeholder="{${placeholder}}"
                        ${placeholder === 'days' ? 'min="1"' : ''}
                        required
                    >
                    ${placeholder === 'days' ? '<p class="text-xs text-gray-500 mt-1">Please enter only numbers</p>' : ''}
                </div>
            `;
        });
        
        editModalContent.innerHTML = formHTML;
        editModal.classList.remove('hidden');
    }
    
    // 从当前中文内容和模板中提取默认值
    function extractDefaultValue(currentChinese, placeholder, template) {
        // 找出模板中占位符的位置
        const placeholderIndex = template.indexOf(`{${placeholder}}`);
        
        if (placeholderIndex === -1) return '';
        
        // 找出当前中文内容中对应的值
        // 这里使用一个简单的方法：根据模板结构，在当前中文内容中提取对应部分
        // 例如，对于模板"我的手机号码后四位是：{number}"和中文内容"我的手机号码后四位是：1234"
        // 我们可以提取"1234"作为默认值
        
        // 获取模板中占位符前后的文本
        const beforePlaceholder = template.substring(0, placeholderIndex);
        const afterPlaceholder = template.substring(placeholderIndex + placeholder.length + 2); // +2 for {}
        
        // 在当前中文内容中找到对应的值
        const startIndex = currentChinese.indexOf(beforePlaceholder);
        if (startIndex === -1) return '';
        
        const valueStartIndex = startIndex + beforePlaceholder.length;
        const valueEndIndex = afterPlaceholder ? currentChinese.indexOf(afterPlaceholder, valueStartIndex) : currentChinese.length;
        
        if (valueEndIndex === -1) return '';
        
        return currentChinese.substring(valueStartIndex, valueEndIndex).trim();
    }
    
    // 不加载保存的编辑数据，每次刷新都初始化
function loadSavedEdits() {
    // 不加载之前保存的编辑数据
    console.log('Not loading saved edits, initializing fresh data');
}
    
    // 初始化编辑功能
    setupEditButtons();
    loadSavedEdits();
    
    // 监听DOM变化，为新添加的可编辑卡片设置编辑按钮
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('phrase-card') && node.getAttribute('data-editable') === 'true') {
                            setupEditButtons();
                        }
                        
                        const newCards = node.querySelectorAll('.phrase-card[data-editable="true"]');
                        if (newCards.length > 0) {
                            setupEditButtons();
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// 初始化显示区域交互
function initDisplayArea() {
    const displayPhrase = document.getElementById('display-phrase');
    const displayEnglish = document.getElementById('display-english');
    const displayContainer = document.getElementById('display-container');
    const showPhraseButtons = document.querySelectorAll('.show-phrase-btn');
    const showSecondaryMenuButtons = document.querySelectorAll('.show-secondary-menu-btn');
    
    // 初始化食物要求功能
    initFoodRequirements();
    
    // 初始化支付方式选项功能
    let paymentOptionsContainer = initPaymentOptions();
    
    // 存储当前需要编辑的卡片
    let currentEditCard = null;
    
    // 为所有显示按钮添加点击事件
    showPhraseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phraseItem = this.closest('.phrase-item');
            let chinese = phraseItem.dataset.chinese;
            let english = phraseItem.dataset.english || '';
            
            // 存储当前卡片，用于快速编辑
            currentEditCard = phraseItem;
            
            // 添加切换动画
            displayContainer.classList.add('display-box-hidden');
            
            setTimeout(() => {
                // 检查是否为空短语或包含未填写的占位符
                if (!chinese || chinese.trim() === '' || chinese.includes('{')) {
                    if (chinese.includes('{')) {
                        // 个性化短语需要先编辑输入内容
                        // 根据占位符内容显示相应的提示信息
                        let placeholderHint = '';
                        if (chinese.includes('{number}')) placeholderHint = 'phone number';
                        else if (chinese.includes('{allergen}')) placeholderHint = 'allergen information';
                        else if (chinese.includes('{name}')) placeholderHint = 'your name';
                        else if (chinese.includes('{address}')) placeholderHint = 'address';
                        else if (chinese.includes('{hotel}')) placeholderHint = 'hotel information';
                        else if (chinese.includes('{days}')) placeholderHint = 'number of days';
                        else placeholderHint = 'required information';
                        
                        // 创建包含输入按钮的HTML
                        displayPhrase.innerHTML = `
                            <div class="flex items-center justify-center gap-3">
                                <span>Please click Edit first to enter ${placeholderHint}</span>
                                <button id="quick-edit-btn" class="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-secondary transition-colors">
                                    <i class="fa fa-pencil mr-1"></i> Enter Now
                                </button>
                            </div>
                        `;
                        displayEnglish.textContent = ''; // 隐藏英文翻译
                        
                        // 为快速编辑按钮添加点击事件
                        document.getElementById('quick-edit-btn').addEventListener('click', function() {
                            const editButton = currentEditCard.querySelector('.edit-template-btn');
                            if (editButton) {
                                editButton.click();
                            }
                        });
                    } else {
                        displayPhrase.textContent = 'Please enter content first before clicking Show';
                        displayEnglish.textContent = ''; // 隐藏英文翻译
                    }
                } else {
                    // 如果中文内容包含HTML标签，使用innerHTML
                    if (chinese.includes('<')) {
                        // 检查是否已经添加了问候语，避免重复添加
                        if (!chinese.includes('你好') && !chinese.includes('谢谢')) {
                            // 检查chinese字符串最后一个字符是否是标点符号
                            const lastChar = chinese.charAt(chinese.length - 1);
                            const punctuationMarks = '。，！？；：,.!?:;';
                            if (punctuationMarks.includes(lastChar)) {
                                displayPhrase.innerHTML = '你好，' + chinese + '谢谢！';
                            } else {
                                displayPhrase.innerHTML = '你好，' + chinese + '。谢谢！';
                            }
                        } else {
                            displayPhrase.innerHTML = chinese;
                        }
                    } else {
                        // 检查是否已经添加了问候语，避免重复添加
                        if (!chinese.includes('你好') && !chinese.includes('谢谢')) {
                            // 检查chinese字符串最后一个字符是否是标点符号
                            const lastChar = chinese.charAt(chinese.length - 1);
                            const punctuationMarks = '。，！？；：,.!?:;';
                            if (punctuationMarks.includes(lastChar)) {
                                displayPhrase.textContent = '你好，' + chinese + '谢谢！';
                            } else {
                                displayPhrase.textContent = '你好，' + chinese + '。谢谢！';
                            }
                        } else {
                            displayPhrase.textContent = chinese;
                        }
                    }
                    
                    // 如果没有提供英文翻译，尝试使用简单翻译器进行翻译
                    if (!english || english.trim() === '') {
                        // 从中文内容中提取纯文本（移除HTML标签）
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = chinese;
                        const plainText = tempDiv.textContent || tempDiv.innerText || '';
                        
                        // 使用翻译器翻译
                        const translatedEnglish = simpleTranslator.translate(plainText, 'zh', 'en');
                        displayEnglish.textContent = translatedEnglish;
                    } else {
                        // 如果英文内容包含HTML标签，使用innerHTML
                        if (english.includes('<')) {
                            displayEnglish.innerHTML = english;
                        } else {
                            displayEnglish.textContent = english;
                        }
                    }
                }
                // 检查是否需要显示支付方式选项
                const showPaymentOptions = phraseItem.getAttribute('data-show-payment-options') === 'true';
                
                // 显示或隐藏支付方式选项容器
                if (showPaymentOptions && paymentOptionsContainer) {
                    paymentOptionsContainer.style.display = 'block';
                    // 将支付方式选项容器添加到显示区域下方
                    displayContainer.parentNode.insertBefore(paymentOptionsContainer, displayContainer.nextSibling);
                    
                    // 添加"可多选"提示到中文文本
                    if (displayPhrase && displayPhrase.textContent && displayPhrase.textContent.includes('支持哪些支付方式？') && !displayPhrase.textContent.includes('可多选')) {
                        displayPhrase.textContent = displayPhrase.textContent + ' 可多选';
                    }
                } else if (paymentOptionsContainer) {
                    paymentOptionsContainer.style.display = 'none';
                }
                
                displayContainer.classList.remove('display-box-hidden');
                
                // 滚动到显示区域
                document.getElementById('home').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        });
    });
    
    // 为所有二级菜单按钮添加点击事件
    showSecondaryMenuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phraseItem = this.closest('.phrase-item');
            const secondaryMenu = phraseItem.querySelector('.secondary-menu');
            
            // 切换二级菜单的显示/隐藏
            secondaryMenu.classList.toggle('hidden');
        });
    });
    
    // 为所有显示按钮添加点击事件
    showPhraseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phraseItem = this.closest('.phrase-item');
            let chinese = phraseItem.dataset.chinese;
            let english = phraseItem.dataset.english || '';
            
            // 存储当前卡片，用于快速编辑
            currentEditCard = phraseItem;
            
            // 添加切换动画
            displayContainer.classList.add('display-box-hidden');
            
            setTimeout(() => {
                // 检查是否为空短语或包含未填写的占位符
                if (!chinese || chinese.trim() === '' || chinese.includes('{')) {
                    if (chinese.includes('{')) {
                        // 个性化短语需要先编辑输入内容
                        // 根据占位符内容显示相应的提示信息
                        let placeholderHint = '';
                        if (chinese.includes('{number}')) placeholderHint = 'phone number';
                        else if (chinese.includes('{allergen}')) placeholderHint = 'allergen information';
                        else if (chinese.includes('{name}')) placeholderHint = 'your name';
                        else if (chinese.includes('{address}')) placeholderHint = 'address';
                        else if (chinese.includes('{hotel}')) placeholderHint = 'hotel information';
                        else if (chinese.includes('{days}')) placeholderHint = 'number of days';
                        else placeholderHint = 'required information';
                        
                        // 创建包含输入按钮的HTML
                        displayPhrase.innerHTML = `
                            <div class="flex items-center justify-center gap-3">
                                <span>Please click Edit first to enter ${placeholderHint}</span>
                                <button id="quick-edit-btn" class="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-secondary transition-colors">
                                    <i class="fa fa-pencil mr-1"></i> Enter Now
                                </button>
                            </div>
                        `;
                        displayEnglish.textContent = ''; // 隐藏英文翻译
                        
                        // 为快速编辑按钮添加点击事件
                        document.getElementById('quick-edit-btn').addEventListener('click', function() {
                            const editButton = currentEditCard.querySelector('.edit-template-btn');
                            if (editButton) {
                                editButton.click();
                            }
                        });
                    } else {
                        displayPhrase.textContent = 'Please enter content first before clicking Show';
                        displayEnglish.textContent = ''; // 隐藏英文翻译
                    }
                } else {
                    // 如果中文内容包含HTML标签，使用innerHTML
                    if (chinese.includes('<')) {
                        // 检查是否已经添加了问候语，避免重复添加
                        if (!chinese.includes('你好') && !chinese.includes('谢谢')) {
                            // 检查chinese字符串最后一个字符是否是标点符号
                            const lastChar = chinese.charAt(chinese.length - 1);
                            const punctuationMarks = '。，！？；：,.!?:;';
                            if (punctuationMarks.includes(lastChar)) {
                                displayPhrase.innerHTML = '你好，' + chinese + '谢谢！';
                            } else {
                                displayPhrase.innerHTML = '你好，' + chinese + '。谢谢！';
                            }
                        } else {
                            displayPhrase.innerHTML = chinese;
                        }
                    } else {
                        // 检查是否已经添加了问候语，避免重复添加
                        if (!chinese.includes('你好') && !chinese.includes('谢谢')) {
                            // 检查chinese字符串最后一个字符是否是标点符号
                            const lastChar = chinese.charAt(chinese.length - 1);
                            const punctuationMarks = '。，！？；：,.!?:;';
                            if (punctuationMarks.includes(lastChar)) {
                                displayPhrase.textContent = '你好，' + chinese + '谢谢！';
                            } else {
                                displayPhrase.textContent = '你好，' + chinese + '。谢谢！';
                            }
                        } else {
                            displayPhrase.textContent = chinese;
                        }
                    }
                    
                    // 如果没有提供英文翻译，尝试使用简单翻译器进行翻译
                    if (!english || english.trim() === '') {
                        // 从中文内容中提取纯文本（移除HTML标签）
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = chinese;
                        const plainText = tempDiv.textContent || tempDiv.innerText || '';
                        
                        // 使用翻译器翻译
                        const translatedEnglish = simpleTranslator.translate(plainText, 'zh', 'en');
                        displayEnglish.textContent = translatedEnglish;
                    } else {
                        // 如果英文内容包含HTML标签，使用innerHTML
                        if (english.includes('<')) {
                            displayEnglish.innerHTML = english;
                        } else {
                            displayEnglish.textContent = english;
                        }
                    }
                }
                displayContainer.classList.remove('display-box-hidden');
                
                // 滚动到显示区域
                document.getElementById('home').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        });
    });
}

// 初始化分类筛选
function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // 获取短语容器，用于重新排序
    const phraseContainer = document.querySelector('#common-phrases .grid');
    
    function filterPhrases(category) {
        const phraseItems = document.querySelectorAll('.phrase-item');
        const itemsToShow = [];
        const itemsToHide = [];
        
        // 首先确定哪些项要显示，哪些要隐藏
        phraseItems.forEach(item => {
            if (category === 'all') {
                // 检查h3标题是否包含⭐️符号
                const h3Element = item.querySelector('h3');
                const hasStar = h3Element && h3Element.textContent.includes('⭐️');
                
                if (hasStar) {
                    itemsToShow.push({ item, hasStar });
                } else {
                    itemsToHide.push(item);
                }
            } else if (item.dataset.category === category) {
                // 检查h3标题是否包含⭐️符号，用于排序
                const h3Element = item.querySelector('h3');
                const hasStar = h3Element && h3Element.textContent.includes('⭐️');
                
                itemsToShow.push({ item, hasStar });
            } else {
                itemsToHide.push(item);
            }
        });
        
        // 对要显示的项进行排序：带⭐️的在前，不带的在后
        itemsToShow.sort((a, b) => {
            if (a.hasStar && !b.hasStar) return -1;
            if (!a.hasStar && b.hasStar) return 1;
            return 0;
        });
        
        // 重新添加排序后的项到容器中
        itemsToShow.forEach(({ item }) => {
            // 先从DOM中移除，再添加到容器末尾，实现排序
            phraseContainer.appendChild(item);
            
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        });
        
        // 隐藏不需要显示的项
        itemsToHide.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        });
    }
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮样式
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-neutral', 'text-neutral-dark/70');
            });
            this.classList.remove('bg-neutral', 'text-neutral-dark/70');
            this.classList.add('bg-primary', 'text-white');
            
            // 筛选短语
            const category = this.dataset.category;
            filterPhrases(category);
        });
    });
    
    // 页面加载后立即应用Commonly Used分类的筛选
    setTimeout(() => {
        const commonlyUsedButton = document.querySelector('.category-btn[data-category="all"]');
        if (commonlyUsedButton && commonlyUsedButton.classList.contains('bg-primary')) {
            filterPhrases('all');
        }
    }, 100);
}
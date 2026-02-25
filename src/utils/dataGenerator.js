/**
 * 测试数据生成器
 * 用于快速生成模拟数据进行前端测试
 */

import { faker } from '@faker-js/faker/locale/zh_CN';

/**
 * 生成单个文章对象
 */
export function generateArticle(overrides = {}) {
    return {
        id: faker.string.uuid(),
        title: faker.lorem.sentence(5),
        content: faker.lorem.paragraphs(3),
        summary: faker.lorem.sentence(10),
        categoryId: faker.string.uuid(),
        tags: faker.helpers.arrayElements(['Vue', 'React', 'Node.js', 'MongoDB', 'Docker', 'Java'], 2),
        status: faker.helpers.arrayElement(['draft', 'published']),
        viewCount: faker.number.int({ min: 0, max: 1000 }),
        likeCount: faker.number.int({ min: 0, max: 100 }),
        commentCount: faker.number.int({ min: 0, max: 50 }),
        createTime: faker.date.past({ years: 1 }).toISOString(),
        updateTime: faker.date.recent({ days: 30 }).toISOString(),
        ...overrides
    };
}

/**
 * 生成多个文章对象
 */
export function generateArticles(count = 10, overrides = {}) {
    return Array.from({ length: count }, () => generateArticle(overrides));
}

/**
 * 生成分类对象
 */
export function generateCategory(overrides = {}) {
    const names = ['技术分享', '生活随笔', '项目实战', '学习笔记', '读书心得', '旅行见闻'];
    const icons = ['folder', 'code', 'book', 'heart', 'star', 'compass'];
    
    return {
        id: faker.string.uuid(),
        name: faker.helpers.arrayElement(names),
        description: faker.lorem.sentence(5),
        icon: faker.helpers.arrayElement(icons),
        articleCount: faker.number.int({ min: 0, max: 50 }),
        createTime: faker.date.past({ years: 1 }).toISOString(),
        updateTime: faker.date.recent({ days: 30 }).toISOString(),
        ...overrides
    };
}

/**
 * 生成多个分类对象
 */
export function generateCategories(count = 5, overrides = {}) {
    return Array.from({ length: count }, () => generateCategory(overrides));
}

/**
 * 生成评论对象
 */
export function generateComment(articleId, overrides = {}) {
    return {
        id: faker.string.uuid(),
        articleId: articleId || faker.string.uuid(),
        content: faker.lorem.paragraph(1),
        nickname: faker.person.fullName(),
        email: faker.internet.email(),
        status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
        createTime: faker.date.recent({ days: 30 }).toISOString(),
        ...overrides
    };
}

/**
 * 生成多个评论对象
 */
export function generateComments(articleId, count = 5, overrides = {}) {
    return Array.from({ length: count }, () => generateComment(articleId, overrides));
}

/**
 * 生成用户对象
 */
export function generateUser(overrides = {}) {
    return {
        id: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        role: faker.helpers.arrayElement(['admin', 'user']),
        status: faker.helpers.arrayElement(['active', 'inactive']),
        createTime: faker.date.past({ years: 1 }).toISOString(),
        ...overrides
    };
}

/**
 * 生成分页数据
 */
export function generatePageData(list, page = 1, pageSize = 10) {
    const total = list.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
        list: list.slice(startIndex, endIndex),
        pagination: {
            page,
            pageSize,
            total,
            totalPages
        }
    };
}

/**
 * 生成完整的测试数据集
 */
export function generateTestData() {
    const categories = generateCategories(5);
    const articles = generateArticles(20);
    const comments = [];
    
    articles.forEach(article => {
        comments.push(...generateComments(article.id, 3));
    });
    
    return {
        categories,
        articles,
        comments,
        users: [generateUser({ role: 'admin' }), generateUser({ role: 'user' })]
    };
}

/**
 * 保存测试数据到本地存储
 */
export function saveTestDataToStorage(key = 'test_data') {
    const data = generateTestData();
    localStorage.setItem(key, JSON.stringify(data));
    console.log('✅ 测试数据已保存到本地存储');
    return data;
}

/**
 * 从本地存储加载测试数据
 */
export function loadTestDataFromStorage(key = 'test_data') {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    return null;
}

/**
 * 清除测试数据
 */
export function clearTestData(key = 'test_data') {
    localStorage.removeItem(key);
    console.log('🗑️ 测试数据已清除');
}

// 暴露到window对象（仅开发环境）
if (import.meta.env.DEV) {
    window.dataGenerator = {
        generateArticle,
        generateArticles,
        generateCategory,
        generateCategories,
        generateComment,
        generateComments,
        generateUser,
        generatePageData,
        generateTestData,
        saveTestDataToStorage,
        loadTestDataFromStorage,
        clearTestData
    };
    
    console.log('📦 测试数据生成器已加载，可通过 window.dataGenerator 访问');
}

export default {
    generateArticle,
    generateArticles,
    generateCategory,
    generateCategories,
    generateComment,
    generateComments,
    generateUser,
    generatePageData,
    generateTestData,
    saveTestDataToStorage,
    loadTestDataFromStorage,
    clearTestData
};

/**
 * API调试工具
 * 用于开发环境下的API请求调试
 */

class ApiDebugger {
    constructor() {
        this.enabled = import.meta.env.DEV;
        this.logs = [];
    }

    /**
     * 记录请求日志
     */
    logRequest(config) {
        if (!this.enabled) return;

        const log = {
            type: 'request',
            timestamp: new Date().toISOString(),
            url: config.url,
            method: config.method?.toUpperCase(),
            params: config.params,
            data: config.data,
            headers: config.headers
        };

        this.logs.push(log);

        console.group(`🚀 API Request: ${log.method} ${log.url}`);
        console.log('📍 Timestamp:', log.timestamp);
        console.log('📤 Params:', log.params);
        console.log('📦 Data:', log.data);
        console.groupEnd();
    }

    /**
     * 记录响应日志
     */
    logResponse(response) {
        if (!this.enabled) return;

        const log = {
            type: 'response',
            timestamp: new Date().toISOString(),
            url: response.config.url,
            status: response.status,
            statusText: response.statusText,
            data: response.data,
            duration: response.duration || 0
        };

        this.logs.push(log);

        console.group(`✅ API Response: ${log.status} ${log.url}`);
        console.log('📍 Timestamp:', log.timestamp);
        console.log('⏱️ Duration:', `${log.duration}ms`);
        console.log('📥 Data:', log.data);
        console.groupEnd();
    }

    /**
     * 记录错误日志
     */
    logError(error) {
        if (!this.enabled) return;

        const log = {
            type: 'error',
            timestamp: new Date().toISOString(),
            url: error.config?.url,
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            stack: error.stack
        };

        this.logs.push(log);

        console.group(`❌ API Error: ${log.status || 'NETWORK'} ${log.url}`);
        console.error('📍 Timestamp:', log.timestamp);
        console.error('💬 Message:', log.message);
        console.error('📥 Response:', log.data);
        console.error('📚 Stack:', log.stack);
        console.groupEnd();
    }

    /**
     * 获取所有日志
     */
    getLogs() {
        return this.logs;
    }

    /**
     * 清空日志
     */
    clearLogs() {
        this.logs = [];
        console.log('🗑️ API日志已清空');
    }

    /**
     * 导出日志
     */
    exportLogs() {
        const data = JSON.stringify(this.logs, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `api-logs-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * 测试API连接
     */
    async testConnection(baseUrl) {
        try {
            const response = await fetch(`${baseUrl}/health`);
            const data = await response.json();
            
            console.group('🔗 API连接测试');
            console.log('✅ 连接成功');
            console.log('📍 URL:', baseUrl);
            console.log('📊 响应:', data);
            console.groupEnd();
            
            return { success: true, data };
        } catch (error) {
            console.group('🔗 API连接测试');
            console.error('❌ 连接失败');
            console.error('📍 URL:', baseUrl);
            console.error('💬 错误:', error.message);
            console.groupEnd();
            
            return { success: false, error };
        }
    }

    /**
     * 性能分析
     */
    analyzePerformance() {
        const requests = this.logs.filter(log => log.type === 'request');
        const responses = this.logs.filter(log => log.type === 'response');
        const errors = this.logs.filter(log => log.type === 'error');

        console.group('📊 API性能分析');
        console.log('📤 总请求数:', requests.length);
        console.log('✅ 成功响应:', responses.length);
        console.log('❌ 失败请求:', errors.length);
        
        if (responses.length > 0) {
            const avgDuration = responses.reduce((sum, r) => sum + (r.duration || 0), 0) / responses.length;
            console.log('⏱️ 平均响应时间:', `${avgDuration.toFixed(2)}ms`);
        }
        
        console.groupEnd();
    }
}

// 创建全局实例
const apiDebugger = new ApiDebugger();

// 暴露到window对象（仅开发环境）
if (import.meta.env.DEV) {
    window.apiDebugger = apiDebugger;
}

export default apiDebugger;

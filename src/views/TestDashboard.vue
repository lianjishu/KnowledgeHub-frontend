<template>
  <div class="test-dashboard">
    <div class="dashboard-header">
      <h1>🧪 测试控制台</h1>
      <p>本地开发环境测试工具</p>
    </div>

    <div class="dashboard-content">
      <!-- API连接测试 -->
      <section class="test-section">
        <h2>📡 API连接测试</h2>
        <div class="test-controls">
          <button @click="testApiConnection" class="btn btn-primary">
            测试连接
          </button>
          <button @click="clearLogs" class="btn btn-secondary">
            清空日志
          </button>
          <button @click="exportLogs" class="btn btn-secondary">
            导出日志
          </button>
        </div>
        <div v-if="connectionStatus" class="test-result">
          <div :class="['status-badge', connectionStatus.success ? 'success' : 'error']">
            {{ connectionStatus.success ? '✅ 连接成功' : '❌ 连接失败' }}
          </div>
          <pre>{{ connectionStatus.data || connectionStatus.error }}</pre>
        </div>
      </section>

      <!-- 测试数据生成 -->
      <section class="test-section">
        <h2>📦 测试数据生成</h2>
        <div class="test-controls">
          <button @click="generateAndSaveData" class="btn btn-primary">
            生成测试数据
          </button>
          <button @click="loadSavedData" class="btn btn-secondary">
            加载已保存数据
          </button>
          <button @click="clearSavedData" class="btn btn-secondary">
            清除数据
          </button>
        </div>
        <div v-if="generatedData" class="test-result">
          <h3>生成的数据统计:</h3>
          <ul>
            <li>分类: {{ generatedData.categories?.length || 0 }} 个</li>
            <li>文章: {{ generatedData.articles?.length || 0 }} 篇</li>
            <li>评论: {{ generatedData.comments?.length || 0 }} 条</li>
            <li>用户: {{ generatedData.users?.length || 0 }} 个</li>
          </ul>
        </div>
      </section>

      <!-- 性能分析 -->
      <section class="test-section">
        <h2>📊 性能分析</h2>
        <div class="test-controls">
          <button @click="analyzePerformance" class="btn btn-primary">
            分析性能
          </button>
        </div>
        <div v-if="performanceStats" class="test-result">
          <ul>
            <li>总请求数: {{ performanceStats.totalRequests }}</li>
            <li>成功响应: {{ performanceStats.successResponses }}</li>
            <li>失败请求: {{ performanceStats.errorRequests }}</li>
            <li>平均响应时间: {{ performanceStats.avgDuration }}ms</li>
          </ul>
        </div>
      </section>

      <!-- 环境信息 -->
      <section class="test-section">
        <h2>🔧 环境信息</h2>
        <div class="env-info">
          <div class="info-item">
            <span class="label">API地址:</span>
            <span class="value">{{ apiBaseUrl }}</span>
          </div>
          <div class="info-item">
            <span class="label">环境:</span>
            <span class="value">{{ environment }}</span>
          </div>
          <div class="info-item">
            <span class="label">Mock模式:</span>
            <span class="value">{{ mockEnabled ? '已启用' : '已禁用' }}</span>
          </div>
          <div class="info-item">
            <span class="label">浏览器:</span>
            <span class="value">{{ userAgent }}</span>
          </div>
        </div>
      </section>

      <!-- 快速操作 -->
      <section class="test-section">
        <h2>⚡ 快速操作</h2>
        <div class="quick-actions">
          <button @click="goToLogin" class="btn btn-primary">
            前往登录页
          </button>
          <button @click="goToAdmin" class="btn btn-primary">
            前往后台
          </button>
          <button @click="reloadPage" class="btn btn-secondary">
            刷新页面
          </button>
          <button @click="clearStorage" class="btn btn-warning">
            清除本地存储
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiDebugger from '@/utils/debugger'
import dataGenerator from '@/utils/dataGenerator'

const router = useRouter()

// 状态
const connectionStatus = ref(null)
const generatedData = ref(null)
const performanceStats = ref(null)

// 环境信息
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
const environment = import.meta.env.MODE
const mockEnabled = import.meta.env.VITE_USE_MOCK === 'true'
const userAgent = navigator.userAgent

// 测试API连接
const testApiConnection = async () => {
  connectionStatus.value = await apiDebugger.testConnection(apiBaseUrl)
}

// 清空日志
const clearLogs = () => {
  apiDebugger.clearLogs()
}

// 导出日志
const exportLogs = () => {
  apiDebugger.exportLogs()
}

// 生成测试数据
const generateAndSaveData = () => {
  generatedData.value = dataGenerator.saveTestDataToStorage()
}

// 加载已保存数据
const loadSavedData = () => {
  generatedData.value = dataGenerator.loadTestDataFromStorage()
  if (!generatedData.value) {
    alert('没有找到已保存的测试数据')
  }
}

// 清除保存的数据
const clearSavedData = () => {
  dataGenerator.clearTestData()
  generatedData.value = null
}

// 分析性能
const analyzePerformance = () => {
  apiDebugger.analyzePerformance()
  
  const logs = apiDebugger.getLogs()
  const requests = logs.filter(log => log.type === 'request')
  const responses = logs.filter(log => log.type === 'response')
  const errors = logs.filter(log => log.type === 'error')
  
  const avgDuration = responses.length > 0
    ? (responses.reduce((sum, r) => sum + (r.duration || 0), 0) / responses.length).toFixed(2)
    : 0
  
  performanceStats.value = {
    totalRequests: requests.length,
    successResponses: responses.length,
    errorRequests: errors.length,
    avgDuration
  }
}

// 导航
const goToLogin = () => router.push('/login')
const goToAdmin = () => router.push('/admin')
const reloadPage = () => window.location.reload()
const clearStorage = () => {
  if (confirm('确定要清除所有本地存储吗？这将清除登录状态和缓存数据。')) {
    localStorage.clear()
    sessionStorage.clear()
    alert('本地存储已清除')
    reloadPage()
  }
}
</script>

<style scoped lang="scss">
.test-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-primary);
  min-height: 100vh;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
  }
}

.test-section {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    border-bottom: 2px solid var(--accent-blue);
    padding-bottom: 0.5rem;
  }
}

.test-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}

.btn-primary {
  background: var(--accent-blue);
  color: white;
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-warning {
  background: #ff6b6b;
  color: white;
}

.test-result {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: 6px;
  
  pre {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: var(--bg-code);
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.875rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-primary);
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
  
  h3 {
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  
  &.success {
    background: #d4edda;
    color: #155724;
  }
  
  &.error {
    background: #f8d7da;
    color: #721c24;
  }
}

.env-info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.info-item {
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: 6px;
  
  .label {
    font-weight: 600;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 0.25rem;
  }
  
  .value {
    color: var(--text-primary);
    font-family: monospace;
    word-break: break-all;
  }
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}
</style>

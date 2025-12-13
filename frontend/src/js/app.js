// API Configuration
const API_BASE_URL = 'http://localhost:9000';

// State Management
const state = {
  items: []
};

// Utility Functions
function showAlert(message, type = 'success') {
  const alertContainer = document.getElementById('alertContainer');
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
  alertDiv.role = 'alert';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  alertContainer.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

function showLoading(show) {
  const loadingEl = document.getElementById('loading');
  if (show) {
    loadingEl.classList.add('show');
  } else {
    loadingEl.classList.remove('show');
  }
}

// API Service
const apiService = {
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  
  async getItems() {
    return this.request('/items');
  },
  
  async createItem(data) {
    return this.request('/items', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  async updateItem(id, data) {
    return this.request(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  async deleteItem(id) {
    return this.request(`/items/${id}`, {
      method: 'DELETE'
    });
  }
};

// UI Functions
function renderItems() {
  const itemsList = document.getElementById('itemsList');
  
  if (state.items.length === 0) {
    itemsList.innerHTML = '<div class="col-12"><p class="text-muted">No items found. Create one to get started!</p></div>';
    return;
  }
  
  itemsList.innerHTML = state.items.map(item => `
    <div class="col-md-4 mb-3">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${escapeHtml(item.name)}</h5>
          <p class="card-text">${escapeHtml(item.description || 'No description')}</p>
          <p class="text-muted small">Created: ${new Date(item.createdAt).toLocaleString()}</p>
        </div>
        <div class="card-footer bg-transparent">
          <button class="btn btn-sm btn-danger" onclick="deleteItem('${item._id}')">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Event Handlers
async function loadItems() {
  try {
    showLoading(true);
    const response = await apiService.getItems();
    state.items = response.data || [];
    renderItems();
  } catch (error) {
    showAlert('Failed to load items', 'danger');
  } finally {
    showLoading(false);
  }
}

async function createItem(event) {
  event.preventDefault();
  
  const name = document.getElementById('itemName').value;
  const description = document.getElementById('itemDescription').value;
  
  try {
    await apiService.createItem({ name, description });
    showAlert('Item created successfully!', 'success');
    document.getElementById('createItemForm').reset();
    await loadItems();
  } catch (error) {
    showAlert('Failed to create item', 'danger');
  }
}

async function deleteItem(id) {
  if (!confirm('Are you sure you want to delete this item?')) {
    return;
  }
  
  try {
    await apiService.deleteItem(id);
    showAlert('Item deleted successfully!', 'success');
    await loadItems();
  } catch (error) {
    showAlert('Failed to delete item', 'danger');
  }
}

// Initialize Application
function init() {
  // Event Listeners
  document.getElementById('createItemForm').addEventListener('submit', createItem);
  document.getElementById('refreshBtn').addEventListener('click', loadItems);
  
  // Load initial data
  loadItems();
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for use in HTML onclick handlers
window.deleteItem = deleteItem;

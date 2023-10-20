let currentUser = [];
let currentUserName = '';
let data = [];
let contacts = [];
let contact = [];
let contactsArray = [];
let currentContact = null;
let contactsForAddTask = []
let categorys = [
    {
        'category': 'Sales',
        'color': 'red'
    },
    {
        'category': 'Backoffice',
        'color': 'green'
    },
    {
        'category': 'Development',
        'color': 'orange'
    },
    {
        'category': 'Testing',
        'color': 'purple'
    },
]
let subtasks = []
let emails = []
let newTask = []
let currentPriority = ""
let newCategoryStatus = false
let assingedToStatus = false
let todos = [];
let currentToDos = [];
let currentDraggedElement;
let selectedCategory = null;
const categoriesOrder = ['open', 'progress', 'feedback', 'closed'];
let currentEmail;
const DROPDOWN_MIN_HEIGHT = '51px';
const DROPDOWN_MAX_HEIGHT = '204px';
const DROPDOWN_Z_INDEX = '20';

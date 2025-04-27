describe('Tasks page (API CRUD tests)', () => {
    const initialTasks = [
      { id: 1, title: 'ทำงานบ้าน', description: 'ล้างจาน กวาดบ้าน' },
      { id: 2, title: 'อ่านหนังสือ', description: 'เตรียมสอบ UX' },
    ];
  
    beforeEach(() => {
      cy.intercept('GET', '/api/tasks', {
        statusCode: 200,
        body: initialTasks,
      }).as('getTasks');
  
      cy.visit('/tasks');
      cy.wait('@getTasks');
    });
  
    it('loads tasks from API and displays them correctly', () => {
      cy.contains('ทำงานบ้าน').should('be.visible');
      cy.contains('ล้างจาน กวาดบ้าน').should('be.visible');
      cy.contains('อ่านหนังสือ').should('be.visible');
    });
  
    it('creates a new task using the API', () => {
      cy.intercept('POST', '/api/tasks', {
        statusCode: 201,
        body: {
          id: 3,
          title: 'ไปวิ่ง',
          description: 'ตอนเช้า',
        },
      }).as('addTask');
  
      cy.intercept('GET', '/api/tasks', {
        statusCode: 200,
        body: [...initialTasks, { id: 3, title: 'ไปวิ่ง', description: 'ตอนเช้า' }],
      }).as('getTasksAfterAdd');
  
      cy.get('input[name="title"]').type('ไปวิ่ง');
      cy.get('textarea[name="description"]').type('ตอนเช้า');
      cy.contains('เพิ่ม').click();
  
      cy.wait('@addTask');
      cy.wait('@getTasksAfterAdd');
  
      cy.contains('ไปวิ่ง').should('be.visible');
      cy.contains('ตอนเช้า').should('be.visible');
    });
  
    it('updates a task title and description', () => {
      cy.window().then((win) => {
        cy.stub(win, 'prompt')
          .onFirstCall().returns('ไปวิ่ง (แก้ไข)')
          .onSecondCall().returns('เย็นแทนเช้า');
      });
  
      cy.intercept('PATCH', '/api/tasks/1', {
        statusCode: 200,
      }).as('updateTask');
  
      cy.intercept('GET', '/api/tasks', {
        statusCode: 200,
        body: [
          { id: 1, title: 'ไปวิ่ง (แก้ไข)', description: 'เย็นแทนเช้า' },
          initialTasks[1],
        ],
      }).as('getTasksAfterUpdate');
  
      cy.contains('ทำงานบ้าน').parent().within(() => {
        cy.contains('แก้ไข').click();
      });
  
      cy.wait('@updateTask');
      cy.wait('@getTasksAfterUpdate');
  
      cy.contains('ไปวิ่ง (แก้ไข)').should('be.visible');
      cy.contains('เย็นแทนเช้า').should('be.visible');
    });
  
    it('deletes a task by calling API', () => {
      cy.window().then((win) => {
        cy.stub(win, 'confirm').returns(true);
      });
  
      cy.intercept('DELETE', '/api/tasks/1', {
        statusCode: 200,
      }).as('deleteTask');
  
      cy.intercept('GET', '/api/tasks', {
        statusCode: 200,
        body: [initialTasks[1]], // เหลือแค่งานที่ 2
      }).as('getTasksAfterDelete');
  
      cy.contains('ทำงานบ้าน').parent().within(() => {
        cy.contains('ลบ').click();
      });
  
      cy.wait('@deleteTask');
      cy.wait('@getTasksAfterDelete');
  
      cy.contains('ทำงานบ้าน').should('not.exist');
    });
  
    it('shows "ไม่พบงาน" message when task list is empty', () => {
      cy.intercept('GET', '/api/tasks', {
        statusCode: 200,
        body: [],
      }).as('getEmptyTasks');
  
      cy.visit('/tasks');
      cy.wait('@getEmptyTasks');
  
      cy.contains('ไม่พบงาน').should('exist').and('be.visible');
    });
  }); 


  
  
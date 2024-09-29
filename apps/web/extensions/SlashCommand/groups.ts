import { Group } from './types'

export const GROUPS: Group[] = [
  {
    name: 'format',
    title: '常用',
    commands: [
      {
        name: 'heading1',
        label: 'H1',
        iconName: 'Heading1',
        description: '高优先级章节标题',
        aliases: ['h1'],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 1 }).run();
        }
      },
      {
        name: 'heading2',
        label: 'H2',
        iconName: 'Heading2',
        description: '中优先级章节标题',
        aliases: ['h2'],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 2 }).run();
        }
      },
      {
        name: 'heading3',
        label: 'H3',
        iconName: 'Heading3',
        description: '低优先级章节标题',
        aliases: ['h3'],
        action: (editor) => {
          editor.chain().focus().setHeading({ level: 3 }).run();
        }
      },
      {
        name: 'bulletList',
        label: '无序列表',
        iconName: 'List',
        description: '无序项目列表',
        aliases: ['ul'],
        action: (editor) => {
          editor.chain().focus().toggleBulletList().run();
        }
      },
      {
        name: 'numberedList',
        label: '有序列表',
        iconName: 'ListOrdered',
        description: '有序项目列表',
        aliases: ['ol'],
        action: (editor) => {
          editor.chain().focus().toggleOrderedList().run();
        }
      },
      {
        name: 'taskList',
        label: '任务列表',
        iconName: 'ListTodo',
        description: '带待办事项的任务列表',
        aliases: ['todo'],
        action: (editor) => {
          editor.chain().focus().toggleTaskList().run();
        }
      },
      {
        name: 'toggleList',
        label: '折叠列表',
        iconName: 'ToggleRight',
        description: '可以显示和隐藏内容的折叠列表',
        aliases: ['toggle'],
        action: (editor) => {
          editor.chain().focus().setDetails().run();
        }
      },
      {
        name: 'blockquote',
        label: '引用块',
        iconName: 'Quote',
        description: '用于引用的元素',
        action: (editor) => {
          editor.chain().focus().setBlockquote().run();
        }
      },
      {
        name: 'codeBlock',
        label: '代码块',
        iconName: 'SquareCode',
        description: '带语法高亮的代码块',
        shouldBeHidden: (editor) => editor.isActive('columns'),
        action: (editor) => {
          editor.chain().focus().setCodeBlock().run();
        }
      }
    ]
  },
  {
    name: 'insert',
    title: '插入',
    commands: [
      {
        name: 'table',
        label: '表格',
        iconName: 'Table',
        description: '插入表格',
        shouldBeHidden: (editor) => editor.isActive('columns'),
        action: (editor) => {
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
            .run();
        }
      },
      {
        name: 'image',
        label: '图片',
        iconName: 'Image',
        description: '插入图片',
        aliases: ['img'],
        action: (editor) => {
          editor.chain().focus().setImageUpload().run();
        }
      },
      {
        name: 'columns',
        label: '分栏',
        iconName: 'Columns',
        description: '添加两栏内容',
        aliases: ['cols'],
        shouldBeHidden: (editor) => editor.isActive('columns'),
        action: (editor) => {
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run();
        }
      },
      {
        name: 'horizontalRule',
        label: '水平分割线',
        iconName: 'Minus',
        description: '插入水平分隔线',
        aliases: ['hr'],
        action: (editor) => {
          editor.chain().focus().setHorizontalRule().run();
        }
      },
      {
        name: 'toc',
        label: '目录',
        iconName: 'Book',
        aliases: ['outline'],
        description: '插入目录',
        shouldBeHidden: (editor) => editor.isActive('columns'),
        action: (editor) => {
          editor.chain().focus().insertTableOfContents().run();
        }
      }
    ]
  }
];

export default GROUPS

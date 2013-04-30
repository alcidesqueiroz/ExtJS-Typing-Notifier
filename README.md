ExtJS Typing Notifier
=====================

What is?
--------
Fires a starttyping event when the user press a key with focus on the bound field, and, if the user goes idle for a specified amount of time (by default, 5 seconds), fires a stoptyping event. A common usage for this plugin is for typing notifications in chat applications.

Usage:
------
```javascript
{
  xtype: 'textarea',
  ...
  plugins: [ Ext.create('Ext.ux.TypingNotifier', { idleTime: '5s' }) ],

  listeners: {
    starttyping: function(field){
      console.log('The user is typing...');
    },

    stoptyping: function(field, wroteSomething){
      console.log('The user is not typing anymore...');
      
      if(wroteSomething) console.log('The user wrote a text.');
    }
  }
}	
```

License
-------
This code is free to use under the terms of the MIT license.
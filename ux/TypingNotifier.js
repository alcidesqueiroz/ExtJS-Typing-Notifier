/**
 * @class Ext.ux.TypingNotifier
 * @author Alcides Queiroz (alcidesqueiroz@gmail.com)
 * @license [MIT][1]
 *
 * @version 0.1
 *
 * [1]: http://opensource.org/licenses/MIT
 *
 * ExtJS Typing Notifier Plugin.
 *
 * Fires a starttyping event when the user press a key with focus on the bound field,
 * and, if the user goes idle for a specified amount of time (by default, 5 seconds), fires 
 * a stoptyping event. A common usage for this plugin is for typing notifications in 
 * chat applications.
 *
 #Usage:#
   {
      xtype: 'textarea',
      ...
      plugins: [ Ext.create('Ext.ux.TypingNotifier', { idleTime: '5s' }) ],

      listeners: {
        starttyping: function(){
          console.log('The user is typing...');
        },

        stoptyping: function(){
          console.log('The user is not typing anymore...');
        }
      }
    }
 *   
 */

(function(){
  /* Converts a string with a length of time (with: ms -> milliseconds, s-> seconds, m-> minutes)
   * into a number of milliseconds */
  var toMilliseconds = function(time) {
    if("string" == typeof time){
      var period = +time.match(/\d+/)[0];
      var unit = time.match(/[a-z]+/i)[0];

      if(unit){
        switch(unit){
          case 's': return period * 1000;

          case 'm': return period * 1000 * 60;

          default: return period; //'ms' or what else unit passed will not be recalculated
        }
      } else 
        return period * 1000;
    } else 
      return period * 1000;
  };

  Ext.define('Ext.ux.TypingNotifier', {
    idleTime: '5s',

    init: function(field){
      var timeout;

      //The idleTime attribute may be passed as a string(period + unit, ie: 10s), 
      //or as number of milliseconds 
      var time = toMilliseconds(this.idleTime);
      
      //Now, we can listen to keyboard events
      field.enableKeyEvents = true;

      var notifyStartTyping = function(){
        field.fireEvent("starttyping", field);
      }

      var notifyStopTyping = function(){
        timeout = null;
        field.fireEvent("stoptyping", field, );
      }

      field.on("keypress", function(){
        if(!timeout) notifyStartTyping();
        clearTimeout(timeout);
        timeout = setTimeout(notifyStopTyping, time);
      });
    }
  });

})();

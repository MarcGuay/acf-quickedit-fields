import $ from 'jquery';

const field = {
	type:'checkbox',
	events:{
		'click .add-choice': 'addChoice',
		'change [type="checkbox"].custom' : 'removeChoice',
	},
	initialize:function() {
		const self = this;
		this.$input = this.$('[type="checkbox"]:not([value="___do_not_change"])');
		this.$button = this.$('button.add-choice').prop('disabled',true);
		this.parent().initialize.apply(this,arguments);
		this.$('.acf-checkbox-toggle[type="checkbox"]').on( 'change', function(e) {
			self.$('[type="checkbox"][value]').prop( 'checked', $(e.target).prop('checked') )
		})
	},
	setEditable:function(editable){
		this.$input.prop( 'disabled', !editable );
		this.$button.prop( 'disabled', !editable );
	},
	setValue:function( value ) {
		const self = this;
		this.dntChanged();
		if ( $.isArray(value) ) {
			$.each( value, function( idx, val ) {
				self.getChoiceCB(val).prop( 'checked', true );
			});
		} else {
			self.getChoiceCB(value).prop( 'checked', true );
		}
	},
	addChoice:function(e){
		e.preventDefault();
		const tpl = wp.template('acf-qef-custom-choice-' + this.$el.attr('data-key'));
		this.$('ul').append(tpl());
	},
	getChoiceCB: function(value) {
		var $choice,
			selector = '[type="checkbox"][value="'+value+'"]',
			$cb = this.$( selector )
		if ( ! $cb.length ) {
			$choice = $( wp.template('acf-qef-custom-choice-value-' + this.$el.attr('data-key'))( { value: value } ) );
			this.$('ul').append( $choice );
			$cb = $choice.find( selector );
		}
		return $cb;
	},
	removeChoice:function(e) {
		$(e.target).closest('li').remove();
	}
}

field.events['change [type="checkbox"][value="'+acf_qef.options.do_not_change_value+'"]'] = 'dntChanged';

module.exports = field;

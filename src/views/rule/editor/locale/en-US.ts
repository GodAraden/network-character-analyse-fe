export default {
  'menu.rule.editor': 'rule edit',
  'rule.editor.step.title.create': 'Create rule',
  'rule.editor.step.title.update': 'edit rule',
  'rule.editor.step.title.view': 'view rule',
  'rule.editor.step.title.baseInfo':
    'Fill in the basic information of the rule',
  'rule.editor.step.subTitle.baseInfo':
    'A rule defines a way to crawl data for a particular content platform',
  'rule.editor.step.title.channel': 'refine rule item',
  'rule.editor.step.subTitle.channel':
    'A rule contains multiple sequential rule items that define the API to be requested, the request parameters, and how the response is parsed',
  'rule.editor.step.title.finish': 'finish editing',
  'rule.editor.step.subTitle.finish': 'Rule edited successfully',
  'rule.editor.create.success.title': 'created successful',
  'rule.editor.create.success.subTitle': 'Rule created~',
  'rule.editor.update.success.title': 'Edit successful',
  'rule.editor.update.success.subTitle': 'Rule edited~',
  'rule.editor.button.next': 'next',
  'rule.editor.button.prev': 'Previous',
  'rule.editor.button.submit': 'submit',
  'rule.editor.button.again': 'create again',
  'rule.editor.button.view': 'View details',

  'rule.editor.basic.label.name': 'Rule Name',
  'rule.editor.basic.placeholder.name': 'Up to 20 characters',
  'rule.editor.basic.error.name.required': 'Please enter a rule name',
  'rule.editor.basic.error.name.pattern': 'maximum 20 characters',
  'rule.editor.basic.label.base': 'BaseURL',
  'rule.editor.basic.placeholder.base':
    'protocol + domain name, e.g. https://www.baidu.com/',
  'rule.editor.basic.error.base.required': 'Please enter BaseURL',
  'rule.editor.basic.error.base.pattern': 'Please enter a valid URL',
  'rule.editor.basic.label.depth': 'crawl depth',
  'rule.editor.basic.error.depth.required':
    'Please enter crawl depth, positive integers 1, 2, 3 are currently supported',

  'rule.editor.rules.label.name': 'Rule item name',
  'rule.editor.rules.placeholder.name':
    'Enter Chinese characters, letters, or numbers, up to 20 characters',
  'rule.editor.rules.error.name.required': 'Please enter a rule item name',
  'rule.editor.rules.error.name.pattern':
    'Please enter Chinese characters, letters, or numbers, up to 20 characters',
  'rule.editor.rules.label.path': 'API path',
  'rule.editor.rules.placeholder.path':
    'The part after the domain name, e.g. /api/v1/search',
  'rule.editor.rules.error.path.required': 'Please enter API path',
  'rule.editor.rules.error.path.pattern': 'Please enter the correct API path',
  'rule.editor.rules.label.parameter': 'parameter rules',
  'rule.editor.rules.placeholder.parameter':
    'JSON format, restricting the content of the request parameters, such as Query, Params, Body',
  'rule.editor.rules.error.parameter.required': 'Please enter a parameter rule',
  'rule.editor.rules.error.parameter.pattern':
    'Please enter the correct parameter rule',
  'rule.editor.rules.label.resolve': 'response parsing rule',
  'rule.editor.rules.error.resolve.required':
    'Please enter a response parsing rule',
  'rule.editor.rules.error.resolve.pattern':
    'Please enter the correct response parsing rule',
  'rule.editor.rules.placeholder.resolve':
    'JSON format, the response will be parsed according to this rule',
  'rule.editor.rules.label.order': 'rule item order',
  'rule.editor.rules.error.order.required':
    'Please enter the order of rule items',
};

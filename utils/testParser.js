const parser = require('css')
const camelCase = require('camel-case')
const glamor = require('glamor')
const stylus = require('stylus')

const getStylesheet = require('../src/utils/stylesheet')
const getParentNode = require('../src/parse/selectors')
const getRootSelector = require('../src/parse/getRootSelector')

/**
 * This function takes a stylus code and parses it. It returns an object containing information
 * about the root element, stylesheet and css hash name generated by glamor.
 * @param { string } stylusCode 
 */
function testParser(stylusCode) {
  let AST, rules, stylesheet, hash, selector, element

  stylus.render(stylusCode, { filename: 'source.css' }, (err, css) => {
    // throws parse errors
    if (err) {
      throw new Error('Indentation error')
    }

    // Generate css AST
    AST = parser.parse(css, { source: 'css' })
    // Get the root selector
    selector = getRootSelector(AST)
    // Set the root element
    element = getParentNode(selector)
    // Style rules
    rules = AST.stylesheet.rules
    // Create array of styles
    stylesheet = getStylesheet(rules, element)
    // Pass styles as css rules to glamor's css constructor
    hash = glamor.css(stylesheet)
  })

  return {
    hash,
    element,
    stylesheet
  }
}

module.exports = testParser

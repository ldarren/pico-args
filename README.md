--Pico Arguments Lib
Yet another barebone command line arguments library

---Usage
----defined default arguments
```javascript
var defaults={
	name: ['{DEFAULT_NAME}','{DESCRIPTION}'],
	n:'@name'
}
```
this is the default for
```
CMD --name xyz
```
or
```
CMD -n xyz
```
----parse arguments
```javascript
var
args=require('pico-args'),
options=args.parse(defaults)

console.log(options.name)
console.log(options.n)
```
----print arguments
this function requires pico-common module
```javascript
args.print('{TITLE}',options)
```
----print usage
this function requires pico-common module
```javascript
args.usage(defaults)
```

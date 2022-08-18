/*
 * @Description:
 * @Author:
 */
/* 
  效果:
    const root = parse(`
      <div id="test" class="container" c="b">
      <div class="text-block">
        <span id="xxx">Hello World</span>
      </div>
      <img src="xx.jpg" />
      </div>
    `);
[
  {
    tagName: "",
    children: [
      {
        tagName: "div",
        attrs: { id: "test", class: "container" },
        rawAttrs: 'id="test" class="container" c="b"',
        type: "element",
        range: [0, 128],
        children: [
          {
            tagName: "div",
            attrs: { class: "text-block" },
            rawAttrs: 'class="text-block"',
            type: "element",
            range: [39, 102],
            children: [
              {
                tagName: "span",
                attrs: { id: "xxx" },
                rawAttrs: 'id="xxx"',
                type: "element",
                range: [63, 96],
                children: [
                  { type: "text", range: [78, 89], value: "Hello World" },
                ],
              },
            ],
          },
          {
            tagName: "img",
            attrs: {},
            rawAttrs: 'src="xx.jpg" ',
            type: "element",
            range: [102, 122],
            children: [],
          },
        ],
      },
    ],
  },
];
*/

// 核心: 正则 + 栈

// 1. 初始化
// node 类型
const nodeType = {
  Text: "text",
  Element: "element",
};
// 模拟的根结点标签
const frameflag = "rootnode";
// 计算完整标签的范围
const createRange = (startPos, endPos) => {
  // 剪掉模拟的根结点
  const frameflagOffset = frameflag.length + 2;
  return [startPos - frameflagOffset, endPos - frameflagOffset];
};
// 找到数组最后一项
function arrBack(arr) {
  return arr[arr.length - 1];
}
function parse(html) {
  // 最外层模拟节点
  const root = {
    tagName: "",
    children: [],
  };
  // 设置 root 为父节点
  let currentParent = root;
  // 栈管理
  const stack = [root];
  let lastTextPos = -1;
  // html 与 根结点拼接
  data = `<${frameflag}>${data}</${frameflag}>`;

  const kMarkupPattern =
    /<(\/?)([a-zA-Z][-.:0-9_a-zA-Z]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/g;
  while ((match = kMarkupPattern.exec(html))) {
    /*
      matchText: 匹配的字符  eg. <span id="xxx">
      leadingSlash: 是否为闭合标签 eg. /
      tagName: 标签名 eg. span
      attributes: 属性 eg. id="xxx"
      closingSlash: 是否为自闭合 eg. /
    */
    let {
      0: matchText,
      1: leadingSlash,
      2: tagName,
      3: attributes,
      4: closingSlash,
    } = match;
    // 本次匹配到的字符串
    const matchLength = matchText.length;
    // 本次匹配的起始位置
    const tagStartPos = kMarkupPattern.lastIndex - matchLength;
    // 本次匹配的末尾位置
    const tagEndPos = kMarkupPattern.lastIndex;

    if (lastTextPos > -1) {
      // 处理文本，eg. hello world
      // 上次匹配的末尾位置 + 本次匹配的字符长度 小于 本次匹配的末尾位置就说明中间有 text，这个稍微想下其实还是比较好理解的
      // 如果没有 text，lastTextPos + matchLength 都会等于 tagEndPos
      if (lastTextPos + matchLength < tagEndPos) {
        // 上次匹配的末尾位置到本次匹配的起始位置
        const text = data.substring(lastTextPos, tagStartPos);
        currentParent.children.push({
          type: nodeType.Text,
          range: createRange(lastTextPos, tagStartPos),
          value: text,
        });
      }
    }

    // 记录上次匹配的位置
    lastTextPos = kMarkupPattern.lastIndex;

    // 如果匹配到的标签是模拟标签，就跳过
    if (tagName === frameflag) continue;

    if (!leadingSlash) {
      const attrs = {};
      // 解析 id、class 属性，并且挂到 attrs 对象下
      const kAttributePattern =
        /(?:^|\s)(id|class)\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+)/gi;
      for (let attMatch; (attMatch = kAttributePattern.exec(attributes)); ) {
        const { 1: key, 2: val } = attMatch;
        // 属性值是否带引号
        const isQuoted = val[0] === `'` || val[0] === `"`;
        attrs[key.toLowerCase()] = isQuoted
          ? val.slice(1, val.length - 1)
          : val;
      }

      const currentNode = {
        tagName,
        attrs,
        rawAttrs: attributes.slice(1),
        type: nodeType.ELEMENT,
        // 这里的 range 不一定是正确的 range，需要匹配到闭标签以后更新
        range: createRange(tagStartPos, tagEndPos),
        children: [],
      };
      // 将当前节点信息放入到 currentParent 的 children 中
      currentParent.children.push(currentNode);
      // 重置 currentParent 节点为当前节点
      currentParent = currentNode;
      // 将每个节点依次塞到栈中，然后在后面的闭标签中以栈的方式释放
      stack.push(currentParent);
    }

    // 自闭合元素
    const kSelfClosingElements = {
      area: true,
      img: true,
    };
    if (leadingSlash || closingSlash || kSelfClosingElements[tagName]) {
      // 开闭标签名是否匹配，比如有可能写成 <div></div1>，这种就需要异常处理
      if (currentParent.tagName === tagName) {
        // 更新 range，之前处理开标签算出的 range 是不包含闭标签的
        currentParent.range[1] = createRange(
          -1,
          Math.max(lastTextPos, tagEndPos)
        )[1];
        // 将处理完的开闭标签踢出
        stack.pop();
        // 将 stack 的最后一个节点赋值给 currentParent
        currentParent = arrBack(stack);
      } else {
        // <div></div1>，异常直接从栈中踢出，不更新 range
        stack.pop();
        currentParent = arrBack(stack);
      }
    }
    return stack;
  }
}

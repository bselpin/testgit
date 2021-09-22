const fs = require("fs")
const globby = require("globby")
const prettier = require("prettier")

const getDate = new Date().toISOString()
const DOMAIN = "https//ddoga.co.kr"

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" })

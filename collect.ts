import { chromium } from 'playwright'
import { proxy } from './proxy'
import { find } from 'better-sqlite3-proxy'
import { DAY } from '@beenotung/tslib/time'

async function main() {
  let browser = await chromium.launch({
    headless: false,
  })
  let page = await browser.newPage()
  await page.goto('https://www.pns.hk/en/')
  let category_1_list = await page.evaluate(function () {
    let links = document.querySelectorAll<HTMLAnchorElement>(
      'pns-navigation-bar pns-header-navigation-tab-menu a',
    )
    let category_1_list: { name: string; slug: string }[] = []
    for (let link of links) {
      let name = link.innerText
      let slug = link.href.split('/').pop()!
      category_1_list.push({ name, slug })
    }
    return category_1_list
  })
  // console.log('category_1_list:', category_1_list)
  for (let category of category_1_list) {
    let row = find(proxy.category_1, { slug: category.slug })
    if (row) {
      if (row.last_check_time < Date.now() - 1 * DAY) {
        console.log('this category is outdated, need to update:', category)
        row.last_check_time = Date.now()
      } else {
        console.log('this category is already updated:', category)
      }
    } else {
      console.log('this category is not seen before:', category)
      proxy.category_1.push({
        name: category.name,
        slug: category.slug,
        last_check_time: Date.now(),
      })
    }
    await page.locator(`[data-banner="SiteLogoComponent"]`).hover()
    await page
      .locator(`pns-header-navigation-tab-menu a[href="/en/${category.slug}"]`)
      .hover()
    await page.waitForSelector('.navSubmenu ul li a')
    let links = await page.evaluate(function () {
      let links = document.querySelectorAll<HTMLAnchorElement>(
        '.navSubmenu ul li a',
      )
      return Array.from(links).map(link => link.href)
    })
    console.log('links:', links)
  }
}

main()

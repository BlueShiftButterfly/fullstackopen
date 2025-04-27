const { test, expect, beforeEach, describe } = require("@playwright/test")
const { loginWith, createBlog, logout } = require("./helper")

describe("Blog app", () => {
    beforeEach(async ({ page, request }) => {
        await request.post("/api/testing/reset")
        await request.post("/api/users", {
            data: {
                name: "Matti Luukkainen",
                username: "mluukkai",
                password: "salainen"
            }
        })
        await request.post("/api/users", {
            data: {
                name: "No.1 Haskell Fan",
                username: "no1haskellfan",
                password: "password"
            }
        })

        await page.goto("/")
    })

    test("Login form is shown", async ({ page }) => {
        await expect(page.getByText("Log in to application")).toBeVisible()
        await expect(page.getByText("Username")).toBeVisible()
        await expect(page.getByText("Password")).toBeVisible()
    })

    describe("Login", () => {
        test("succeeds with correct credentials", async ({ page }) => {
            await loginWith(page, "mluukkai", "salainen")
            await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible()
        })
    
        test("fails with wrong credentials", async ({ page }) => {
            await loginWith(page, "mluukkai", "vääräsalasana")
            const errorDiv = await page.locator(".error")
            await expect(errorDiv).toContainText("Wrong credentials")
        })
    })
    describe("When logged in", () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, "mluukkai", "salainen")
        })
        test("a new blog can be created", async ({ page }) => {
            await createBlog(page, "Clean Code 2", "Robert C. Martin", "www.example.com")
            await expect(page.getByText("Clean Code 2 -- Robert C. Martin")).toBeVisible()
        })
        test("a blog can be liked", async ({ page }) => {
            await page.getByText("Blogs").waitFor()
            await createBlog(page, "Rust Fundamentals", "Rust Rusterson", "www.example.com")
            await page.getByRole("button", { name: "View" }).first().click()
            await page.getByRole("button", { name: "Like" }).click()
            await expect(page.getByText("Likes: 1")).toBeVisible()
        })
    })
})
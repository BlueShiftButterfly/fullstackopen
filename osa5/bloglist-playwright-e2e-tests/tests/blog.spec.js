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
            await createBlog(page, "Rust Fundamentals", "Rust Rusterson", "www.example.com")
            await page.getByRole("button", { name: "View" }).first().click()
            await page.getByRole("button", { name: "Like" }).click()
            await expect(page.getByText("Likes: 1")).toBeVisible()
        })
        test("a blog can be removed by creator", async ({ page }) => {
            await createBlog(page, "TITLEREMOVED", "AUTHOR", "www.example.com")
            await page.getByText("Created new blog TITLEREMOVED by AUTHOR").waitFor()
            await page.getByRole("button", { name: "View" }).first().click()
            page.on("dialog", dialog => dialog.accept());
            await page.getByRole("button", { name: "Remove" }).click()
            await expect(page.getByText("Removed TITLEREMOVED by AUTHOR")).toBeVisible()
        })
        test("blog remove button is only seen by creator", async ({ page }) => {
            await createBlog(page, "Rust Fundamentals", "Rust Rusterson", "www.example.com")
            await logout(page)
            await page.getByText("Log in to application").waitFor()
            await loginWith(page, "no1haskellfan", "password")
            await page.getByText("No.1 Haskell Fan logged in").waitFor()
            await page.getByRole("button", { name: "View" }).first().click()
            await expect(page.getByText("Remove")).not.toBeVisible()
        })
        test("blogs are ordered according to their like count", async ({ page }) => {
            await createBlog(page, "Rust Fundamentals", "Rust Rusterson", "www.example.com")
            await createBlog(page, "Clean Code 2", "Robert C. Martin", "www.example.com")
            await createBlog(page, "OOP Fundamentals", "O. O. Programmerson", "www.example.com")
            await page.getByText("OOP Fundamentals -- O. O. Programmerson").waitFor()
            await page.getByRole("button", { name: "View" }).last().click()
            await page.getByRole("button", { name: "Like" }).click()
            await page.getByText("Likes: 1").waitFor()
            await page.getByRole("button", { name: "Like" }).click()
            await page.getByText("Likes: 2").waitFor()
            await page.getByRole("button", { name: "Hide" }).click()
            await page.getByRole("button", { name: "View" }).last().click()
            await page.getByRole("button", { name: "Like" }).click()
            await page.getByText("Likes: 1").first().waitFor()
            await page.getByRole("button", { name: "Hide" }).click()
            // awful but it works
            const expectedOrder = [
                "OOP Fundamentals -- O. O. ProgrammersonViewHideLink: www.example.comLikes: 2 LikeBy: Matti LuukkainenRemove",
                "Clean Code 2 -- Robert C. MartinViewHideLink: www.example.comLikes: 1 LikeBy: Matti LuukkainenRemove",
                "Rust Fundamentals -- Rust RustersonViewHideLink: www.example.comLikes: 0 LikeBy: Matti LuukkainenRemove",
            ]
            await expect(page.locator(".blog")).toHaveText(expectedOrder)
        })
    })
})
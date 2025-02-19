<template>
    <div class="login_main">
        <div class="login_form_wrapper">
            <div class="login_footer">
                <span>ВХОД</span>
                <router-link to="/registration">
                    <v-btn :text="'Регистрация'"
                /></router-link>
            </div>
            <div
                ref="formRef"
                class="demo-dynamic"
                style="width: 360px"
            >
                <div
                    class="label_custom-color"
                    prop="email"
                    label="Введите Email"
                    :rules="rules"
                >
                    <v-text-field
                        class="input_color"
                        v-model="loginData.email"
                    />
                </div>
                <div
                    class="label_custom-color"
                    :label="'Введите пароль'"
                    :prop="'password'"
                    :rules="{
                        message: 'Введите пароль',
                        trigger: 'blur'
                    }"
                >
                    <v-text-field
                        v-model="loginData.password"
                        class="input_color"
                    />
                </div>
                <div class="flex-center login_actions">
                    <div>
                        <v-btn
                            class="btn"
                            :disabled="disabledBtn"
                            :color="disabledBtn ? '#4f9b9bba' : '#05f5f5'"
                            @click="submitForm(formRef)"
                            >Войти</v-btn
                        >
                        <v-btn
                            class="btn"
                            color="#890cb0"
                            :dark="true"
                            @click="resetForm(formRef)"
                            >Очистить</v-btn
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="title">MEMAS</div>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { getFetch } from '@/helpers/helpers.ts'
import { useMainStore } from '@/stores/mainState'
import { useRouter } from 'vue-router'
import type { I_UserLogin } from '@/types/user/userTypes.ts'

const router = useRouter()
const mainStore = useMainStore()
const formRef = ref()
const loginData = reactive<I_UserLogin>({
    password: '',
    email: ''
})
const rules = reactive({
    email: [
        {
            type: 'email',
            message: 'Введите корректный email!',
            trigger: ['blur']
        }
    ],
    password: [
        { min: 6, max: 32, message: 'Длина должна быть от 6 до 32 символов', trigger: 'blur' }
    ]
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
        if (valid) {
            const data = await getFetch('/api/v1/auth', loginData)
            const assess = data.statusCode === 200
            mainStore.setAuthState(assess)
            if (assess) {
                mainStore.setUserData({ userData: data.userId })
                await router.push('/')
            }
        } else {
            console.log('error submit!')
        }
    })
}
const disabledBtn = computed(() => {
    return !loginData.email || !loginData.password
})
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style scoped lang="scss">
//@import "@/assets/global.scss";
@font-face {
    font-family: 'Cyberpunk';
    src: url('../assets/fonts/Cyberpunk-Regular.ttf') format('truetype');
}
.title {
    position: fixed;
    top: 1rem;
    font-family: Cyberpunk;
    font-size: 12rem;
    color: #05f5f5;
    animation:
        glitch 5s step-end infinite alternate,
        glitch-skew 5s step-end infinite alternate;
    z-index: 0;
    @keyframes glitch {
        13% {
            clip-path: polygon(
                90% 55%,
                20% 97%,
                85% 42%,
                20% 62%,
                6% 55%,
                76% 74%,
                68% 67%,
                49% 32%,
                47% 41%,
                2% 16%,
                95% 73%,
                68% 14%,
                35% 81%,
                31% 57%,
                29% 24%,
                57% 63%,
                52% 91%,
                45% 82%,
                6% 81%,
                82% 88%,
                30% 61%,
                70% 18%,
                15% 36%,
                16% 67%,
                74% 84%,
                21% 81%
            );
        }

        53% {
            clip-path: polygon(
                46% 96%,
                51% 63%,
                92% 0%,
                47% 85%,
                26% 37%,
                15% 6%,
                16% 15%,
                64% 28%,
                69% 88%,
                50% 49%,
                29% 17%,
                91% 74%,
                54% 36%,
                85% 94%,
                89% 92%,
                96% 22%,
                47% 75%,
                51% 12%,
                12% 37%,
                1% 41%,
                63% 33%,
                90% 52%,
                48% 18%,
                5% 56%,
                77% 80%,
                60% 48%
            );
        }

        37% {
            clip-path: polygon(
                73% 96%,
                32% 94%,
                26% 33%,
                40% 16%,
                69% 28%,
                72% 42%,
                32% 33%,
                22% 3%,
                55% 64%,
                79% 57%,
                57% 39%,
                0% 44%,
                27% 36%,
                17% 32%,
                47% 35%,
                53% 10%,
                65% 96%,
                72% 51%,
                15% 56%,
                61% 21%,
                66% 29%,
                33% 7%,
                8% 86%,
                47% 89%,
                43% 56%,
                98% 7%
            );
        }

        62% {
            clip-path: polygon(
                44% 98%,
                91% 91%,
                90% 18%,
                72% 50%,
                63% 5%,
                36% 64%,
                23% 8%,
                43% 19%,
                88% 86%,
                7% 22%,
                37% 99%,
                71% 21%,
                76% 50%,
                100% 73%,
                5% 41%,
                65% 26%,
                19% 55%,
                36% 5%,
                11% 83%,
                28% 48%,
                36% 36%,
                9% 64%,
                64% 22%,
                66% 38%,
                80% 68%,
                69% 76%
            );
        }

        78% {
            clip-path: polygon(
                24% 46%,
                40% 79%,
                28% 54%,
                98% 82%,
                87% 67%,
                36% 71%,
                37% 29%,
                89% 26%,
                89% 21%,
                8% 8%,
                61% 35%,
                4% 23%,
                90% 77%,
                46% 98%,
                82% 6%,
                76% 94%,
                17% 52%,
                59% 22%,
                76% 92%,
                39% 44%,
                74% 97%,
                16% 6%,
                89% 84%,
                80% 52%,
                85% 55%,
                7% 91%
            );
        }
        14%,
        39%,
        56%,
        64%,
        79% {
            clip-path: none;
        }
    }

    @keyframes glitch-skew {
        13% {
            transform: skew(10deg, 10deg) scale(0.6);
        }

        53% {
            transform: skew(20deg, 50deg) scale(0.6);
        }

        37% {
            transform: skew(-83deg, 17deg) scale(0.6);
        }

        78% {
            transform: skew(289deg, 18deg) scale(0.6);
        }
        14%,
        39%,
        56%,
        64%,
        79% {
            transform: none;
        }
    }
}
.login_main {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(90deg, #76bc22 0%, #b763e1 100%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #f8f8f8;

    a {
        color: #2aced2;
    }
    .login_form_wrapper {
        position: relative;
        padding: 2rem 2rem 1rem 2rem;
        background-color: #6d2082e3;
        background: linear-gradient(
            126deg,
            rgba(14, 14, 230, 0.9528186274509804) 12%,
            rgba(213, 21, 218, 1) 82%
        );
        border-radius: 6px;
        z-index: 1;
        .login_title {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
            color: #fff;
        }
        .login_actions {
            margin-top: 2rem;
        }
        .login_footer {
            display: flex;
            //flex-direction: column;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 1rem;
            gap: 0.5rem;
            cursor: default;
        }
    }
}
//.btn:before {
//    content: '';
//    position: absolute;
//    top: 0;
//    left: -100%;
//    width: 100%;
//    height: 100%;
//    background: linear-gradient(120deg, transparent, rgba(146, 148, 248, 0.4), transparent);
//    transition: all 650ms;
//}
//
//.btn:hover:before {
//    left: 100%;
//}
</style>

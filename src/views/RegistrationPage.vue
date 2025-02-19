<template>
    <div class="registration">
        <v-form validate-on="submit lazy" @submit.prevent="submitForm"
            ref="userCreateRef"
            style="max-width: 600px"
            class="form"
        >
            <div class="registration_footer">
                <span>РЕГИСТРАЦИЯ</span>
                <router-link to="/login">
                    <v-btn :text="'Вход'"
                /></router-link>
            </div>
                <div >
                    <component
                        v-for="(component, idx) in componentsData" :key="idx"
                        :is="component.component"
                        v-model="userCreate[component.model as keyof I_UserCreate]"
                        v-bind="component.props"
                    >
                        <div v-if="component.subComponents">
                            <component
                                v-for="(subComponent, subIdx) in component.subComponents"
                                :key="subIdx"
                                :is="subComponent.component"
                                v-bind="subComponent.props"
                                ></component
                            >
                        </div>
                    </component>
                </div>
            <div class="info">* - поля обязательные для заполнения</div>
            <div>
                <v-btn
                    class="btn"
                    :disabled="disabledBtn"
                    :color="disabledBtn ? '#4f9b9bba' : '#05f5f5'"
                    type="submit"

                >
                    Зарегистрироваться
                </v-btn>
                <v-btn class="btn" color="#890cb0" @click="resetForm(userCreateRef)"
                    >Сбросить</v-btn
                >
            </div>
        </v-form>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, shallowRef} from 'vue'
import { getFetch } from '@/helpers/helpers.ts'
import { useRouter } from 'vue-router'
import type { I_UserCreate } from '@/types/user/userTypes.ts'
import { useMainStore } from '@/stores/mainState'
import { computed } from 'vue'
import {VTextField, VRadio, VRadioGroup,} from "vuetify/components";
import {E_Sex} from "@/enums/userEnum.ts";

const router = useRouter()
const $mainStore = useMainStore()

const loading = ref()
const userCreateRef = ref<FormInstance>()
const userCreate = reactive<I_UserCreate>({
    email: '',
    phone: '',
    password: '',
    passwordRepeat: '',
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    sex: 0,
    region: '',
    city: '',
    isAcceptedCookies: false,
    isAcceptLicense: false
})

onMounted(() => {
    //TODO rm to prod
    (function devData () {
        userCreate.email = 'testUser1@hmail.hru'
        userCreate.phone = '79112223344'
        userCreate.password = 'qwertyui'
        userCreate.passwordRepeat = 'qwertyui'
        userCreate.firstName = 'test'
        userCreate.lastName = 'user'
        userCreate.birthDate = "2024-07-01 00:00:00"
        userCreate.sex = 0
        userCreate.isAcceptedCookies = true
        userCreate.isAcceptLicense = true
    })()
})

const disabledBtn = computed(() => {
    return (
        !userCreate.email ||
        !userCreate.password ||
        !userCreate.passwordRepeat ||
        !userCreate.phone ||
        !userCreate.firstName ||
        !userCreate.lastName
    )
})

const rules = {
  required: (val) => !!val || 'Поле обязательно для заполнения',
  validatePass: (value: string): string => {
    if (!value) return 'Введите пароль!'
    if (value.length < 8) return 'Пароль должен состоять минимум из 8 символов!'
    if (value.length > 32) return 'Максимальная длинна пароля 32 символа!'
    if (value.match(/\W[^\\.?!]/gi))
      return 'Пароль может состоять только из латинских букв, цифр и символов ".?!"!'
    return !!value
  },
  validatePassRepeat: (value: string): string => {
    if (!value) return 'Введите пароль!'
    if (value !== userCreate.password) return 'Пароли не совпадают!'
    return !!value
  },
}

const componentsData: I_ComponentData[] = shallowRef([
    {
        component: VTextField,
        model: 'firstName',
        props: {
          label: 'Имя',
          variant: 'outlined',
          density: 'compact',
          rules: [rules.required]
        }
    },
    {
        component: VTextField,
        model: 'lastName',
        props: {
          label: 'Фамилия',
          variant: 'outlined',
          density: 'compact',
          rules: [rules.required]
        }
    },
    {
      // TODO регулярка проверки email
        component: VTextField,
        model: 'email',
        props: {
          label: 'Email',
          variant: 'outlined',
          density: 'compact',
          rules: [rules.required]
        }
    },
    {
        component: VTextField,
        model: 'phone',
        props: {
          label: 'Телефон',
          variant: 'outlined',
          density: 'compact',
          rules: [rules.required]
        }
    },
    {
        component: VTextField,
        model: 'password',
        props: {
          label: 'Пароль',
          variant: 'outlined',
          density: 'compact',
          type: 'password',
          'show-password': true,
          rules: [rules.validatePass]
        }
    },
    {
        component: VTextField,
        model: 'passwordRepeat',
        props: {
          label: 'Повторите пароль',
          variant: 'outlined',
          density: 'compact',
          type: 'password',
          'show-password': true,
          rules: [rules.validatePassRepeat]
        }
    },
    // {
    //     component: 'v-date-picker',
    //     parentProps: {
    //         class: 'label_custom-color',
    //         label: 'Дата рождения',
    //         prop: 'birthDate'
    //     },
    //     model: 'birthDate',
    //     props: {
    //         id: 'v-date-picker',
    //         class: 'input_color',
    //         type: 'date',
    //         format: 'DD.MM.YYYY',
    //         'value-format': 'YYYY-MM-DD HH:mm:ss',
    //         'aria-label': 'Выберите дату',
    //         placeholder: 'Выберите дату'
    //     }
    // },
    {
        component: VRadioGroup,
        model: 'sex',
        props: {
          label: 'Пол',
        },
      subComponents: [
        {
          component: VRadio,
          props: {
            color: 'red',
            label: 'Мужской',
            value: E_Sex.Male
          }
        },
        {
          component: VRadio,
          props: {
            color: 'red',
            label: 'Женский',
            value: E_Sex.Female
          }
        }
      ]
    },
    // {
    //     component: 'v-checkbox',
    //     parentProps: {
    //         class: 'label_custom-color',
    //         label: 'Согласен на предоставление Cookie',
    //         prop: 'isAcceptedCookies'
    //     },
    //     model: 'isAcceptedCookies',
    //     props: {
    //         name: 'isAcceptedCookies'
    //     }
    // },
    // {
    //     component: 'v-checkbox',
    //     parentProps: {
    //         class: 'label_custom-color',
    //         label: 'Согласен с условиями лицензии',
    //         prop: 'isAcceptLicense'
    //     },
    //     model: 'isAcceptLicense',
    //     props: {
    //         name: 'isAcceptLicense'
    //     }
    // }
])

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log(formEl)
    if (!formEl) return
    loading.value = true

  await formEl.then(async (result) => {
    if (result.valid) {
      console.log('valid', result)
      // const response = await getFetch('/api/v1/users/create', userCreate)
      if (response.statusCode === 200) {
        $mainStore.setAuthState(true)
        $mainStore.setUserData({ userId: response.data.id })
        await router.push('/')
      }
    }
  }).catch(error => {
    console.log(error)
  })
  loading.value = false
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style scoped lang="scss">
.registration {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: linear-gradient(90deg, #76bc22 0%, #b763e1 100%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    color: #f8f8f8;
    .form {
        height: 100vh;
        overflow-y: auto;
        padding: 1rem 5rem;
        color: #f8f8f8;
        background: linear-gradient(90deg, #fc466b 0%, #3f5efb 100%);
        border-radius: 6px;
        .info {
            margin: 2rem auto;
            color: #631818;
        }
    }
}
.registration_footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 1rem;
    gap: 0.5rem;
    font-size: 16px;
    cursor: default;
}
</style>
